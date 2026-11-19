import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Keep the Lovable/Cloudflare build in vite.config.ts independent of Pages.
export default defineConfig({
  base: "/",
  build: { outDir: "dist-pages" },
  // Use the same loopback address for the prerender server and its HTTP client.
  preview: { host: "127.0.0.1" },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        autoSubfolderIndex: true,
        crawlLinks: false,
        failOnError: true,
      },
      sitemap: { host: "https://xn----8sbemzyboblfg.xn--p1ai" },
    }),
    react(),
  ],
});
