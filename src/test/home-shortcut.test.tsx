import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// The "На Главную" shortcut exists only where the visitor is already away from home:
// it must appear in the header and footer of an interior page and stay out of the home page.
function makeRouter(path: string) {
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    context: { queryClient: new QueryClient() },
    defaultPreload: false,
  });
}

async function renderAt(path: string) {
  const router = makeRouter(path);
  await router.load();
  return render(<RouterProvider router={router} />);
}

async function waitForPage() {
  await waitFor(() => {
    if (!document.querySelector("header") || !document.querySelector("footer")) {
      throw new Error("page not rendered yet");
    }
  });
}

describe("Home shortcut", () => {
  afterEach(cleanup);

  it("offers a way back home on an interior page, in header and footer", async () => {
    await renderAt("/about");
    await waitForPage();

    expect(document.querySelector("header")?.textContent).toMatch(/На Главную/i);
    expect(document.querySelector("footer")?.textContent).toMatch(/На Главную/i);
    expect(document.querySelector('header a[href="/"]')).not.toBeNull();
  });

  it("does not offer it on the home page itself", async () => {
    await renderAt("/");
    await waitForPage();

    expect(document.querySelector("header")?.textContent).not.toMatch(/На Главную/i);
    expect(document.querySelector("footer")?.textContent).not.toMatch(/На Главную/i);
  });
});
