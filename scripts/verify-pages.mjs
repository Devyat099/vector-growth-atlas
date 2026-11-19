import assert from "node:assert/strict";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const output = path.resolve(fileURLToPath(new URL("../dist-pages/client/", import.meta.url)));
const base = "/vector-growth-atlas/";
const origin = "https://devyat099.github.io";
const routeFiles = await readdir(new URL("../src/routes/", import.meta.url));
const routes = routeFiles
  .filter((file) => file.endsWith(".tsx") && !file.startsWith("__"))
  .map((file) => (file === "index.tsx" ? "" : file.slice(0, -4)));
const titles = new Set();
let checkedLinks = 0;

async function checkLocalUrl(value, pageUrl) {
  if (!value || /^(?:data:|mailto:|tel:|javascript:|#)/.test(value)) return;
  const url = new URL(value.replaceAll("&amp;", "&"), pageUrl);
  if (url.origin !== origin) return;
  assert(url.pathname.startsWith(base), `URL escapes project base: ${value}`);
  const relative = decodeURIComponent(url.pathname.slice(base.length));
  const target = path.resolve(output, relative);
  assert(target === output || target.startsWith(output + path.sep), `Unsafe asset path: ${value}`);
  try {
    const info = await stat(target);
    if (info.isDirectory()) await access(path.join(target, "index.html"));
  } catch {
    // Prerendered route links may omit the trailing slash.
    await access(path.join(target, "index.html"));
  }
  checkedLinks++;
}

for (const route of routes) {
  const html = await readFile(path.join(output, route, "index.html"), "utf8");
  assert(/<main[\s>]/.test(html), `Missing prerendered main content: /${route}`);
  assert(/<h1[\s>]/.test(html), `Missing prerendered heading: /${route}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title?.trim(), `Missing title: /${route}`);
  assert(!titles.has(title), `Duplicate page title: ${title}`);
  titles.add(title);
  assert(!html.includes("/__l5e/"), `Lovable-only asset in /${route}`);
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    await checkLocalUrl(match[1], `${origin}${base}${route}`);
  }
}

for (const name of ["industrial-welding", "engineer", "production"]) {
  const bytes = await readFile(path.join(output, "pages-assets", `${name}.jpg`));
  assert(bytes[0] === 0xff && bytes[1] === 0xd8, `Invalid JPEG: ${name}`);
}
const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
for (const route of routes) {
  assert(sitemap.includes(`${origin}${base}${route}`), `Route missing from sitemap: /${route}`);
}
await access(path.join(output, ".nojekyll"));
const notFound = await readFile(path.join(output, "404.html"), "utf8");
assert(notFound.includes(`href="${base}"`), "404 home link must include the project base");
console.log(
  `Pages verified: ${routes.length} prerendered routes, ${checkedLinks} local URLs, 3 photos, sitemap and 404.`,
);
