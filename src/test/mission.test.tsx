import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// The mission block is the editorial core of /about: its statement must be readable
// without any clicking, and the interactive focus list must keep exactly one panel open.
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

async function waitForMission() {
  await waitFor(() => {
    if (!screen.queryByText(/Открывать промышленную Россию через реальные истории/)) {
      throw new Error("mission block not rendered yet");
    }
  });
}

describe("Mission block on /about", () => {
  afterEach(cleanup);

  it("states the mission without any interaction", async () => {
    await renderAt("/about");
    await waitForMission();

    expect(screen.getByText("Наша миссия")).toBeInTheDocument();
    expect(
      screen.getByText("Открывать промышленную Россию через реальные истории"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/федеральный документальный медиапроект, посвящённый предприятиям России/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/за каждым сильным предприятием стоит сильная команда/),
    ).toBeInTheDocument();
  });

  it("opens exactly one focus panel and switches it on click", async () => {
    await renderAt("/about");
    await waitForMission();

    const buttons = screen.getAllByRole("button", { expanded: true });
    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.textContent).toMatch(/Как устроены производственные процессы/);

    const target = screen.getByRole("button", {
      name: /Какие возможности открывает промышленный сектор/,
    });
    fireEvent.click(target);

    const open = screen.getAllByRole("button", { expanded: true });
    expect(open).toHaveLength(1);
    expect(open[0]?.textContent).toMatch(/Какие возможности открывает промышленный сектор/);
    expect(
      screen.getByText(/сделать современную российскую промышленность ближе и понятнее/),
    ).toBeInTheDocument();
  });

  it("keeps the mission block out of other pages", async () => {
    await renderAt("/media");
    await waitFor(() => {
      if (!document.querySelector("footer")) throw new Error("page not rendered yet");
    });

    expect(screen.queryByText("Наша миссия")).toBeNull();
  });
});
