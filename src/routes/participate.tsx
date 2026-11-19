import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ContactForm } from "@/components/contact-form";
import { pageHead } from "@/data/project";

export const Route = createFileRoute("/participate")({
  head: () =>
    pageHead(
      "Участие в проекте",
      "Предложите предприятие для участия в документальном медиапроекте «Вектор роста».",
    ),
  component: Participate,
});
function Participate() {
  return (
    <SiteShell>
      <main className="interior-page">
        <div className="page-cover">
          <div className="container-wide">
            <div className="eyebrow">Станьте частью проекта</div>
            <h1>Ваша история достойна внимания.</h1>
            <p className="text-on-ink-muted text-sm leading-7">
              Расскажите о своём предприятии и людях, которые стоят за его успехом.
            </p>
          </div>
        </div>
        <div className="container-wide">
          <div className="page-body">
            <h2>Предложить предприятие</h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
