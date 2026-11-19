import { writeFile } from "node:fs/promises";

const output = new URL("../dist-pages/client/", import.meta.url);

await writeFile(new URL(".nojekyll", output), "");
// Pages serves this file with HTTP 404; known routes have their own index.html.
await writeFile(
  new URL("404.html", output),
  `<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Страница не найдена — Вектор роста</title></head>
<body><main><h1>Страница не найдена</h1><p>Проверьте адрес или вернитесь на главную страницу.</p><a href="/">Вектор роста — главная</a></main></body>
</html>
`,
);
