import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { InteractiveRussiaMap } from "@/components/interactive-russia-map";
import { pageHead } from "@/data/project";

export const Route = createFileRoute("/regions")({
  validateSearch: (search: Record<string, unknown>): { region?: string | undefined } => ({
    region: typeof search["region"] === "string" ? search["region"] : undefined,
  }),
  head: () =>
    pageHead(
      "Регионы России",
      "География документального медиапроекта «Вектор роста». Предприятия и люди регионов России.",
    ),
  component: Regions,
});
function Regions() {
  const { region } = Route.useSearch();
  return (
    <SiteShell>
      <main className="interior-page">
        <div className="page-cover">
          <div className="container-wide">
            <div className="eyebrow">География проекта</div>
            <h1>Россия. Регион за регионом.</h1>
            <p className="text-on-ink-muted text-sm leading-7">
              Открываем промышленный потенциал регионов, рассказываем о предприятиях, технологиях и
              людях.
            </p>
          </div>
        </div>
        <div className="editorial-section container-wide">
          <InteractiveRussiaMap initialRegion={region} />
        </div>
      </main>
    </SiteShell>
  );
}
