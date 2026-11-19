# Vector Growth Atlas

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/65903972-57ac-4107-8bc1-1ca8cf9342d2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## GitHub Pages

The Pages address is https://devyat099.github.io/vector-growth-atlas/ once
deployment is enabled and the workflow succeeds.

The project uses React 19, TypeScript, TanStack Start/Router, Vite and Tailwind CSS.
The existing `npm run build` and `vite.config.ts` remain the Lovable/server build.
Pages uses the separate `vite.pages.config.ts` to prerender every public route;
only `dist-pages/client` is published, with no server runtime required.

Use Node.js 22 and Bun 1.4.5, keeping the existing lockfile:

```sh
bun install --frozen-lockfile
bun run test
bun run build:pages
bun run verify:pages
```

The Pages build sets `/vector-growth-atlas/` as Vite's base and TanStack's router
base. Each route has its own `index.html`, so direct links and refreshes work.
The `github-pages` build mode uses local copies of the same approved photos
instead of Lovable's internal image proxy. Image sources are in
`public/pages-assets/README.md`. Participation remains a frontend demonstration.

In repository **Settings → Pages → Build and deployment → Source**, select
**GitHub Actions**. A private personal repository requires GitHub Pro or an
eligible paid plan; the Pages site itself is public. Do not change repository
visibility just to enable hosting without reviewing that choice.

`.github/workflows/deploy-pages.yml` tests and builds pull requests, and deploys
`main` on pushes or manual runs. The first run needs Pages enabled in Settings;
the ordinary workflow token cannot enable it automatically. If enablement or a
plan restriction blocks deployment, the workflow logs will report the failure.

References: [TanStack prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering),
[Vite project base](https://vite.dev/guide/build.html#public-base-path),
[GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
