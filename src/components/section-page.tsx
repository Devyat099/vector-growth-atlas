import { Film, ArrowUpRight } from "lucide-react";
import { sections } from "@/data/project";
import { Button } from "@/components/ui/button";
import { SiteShell, useParticipation } from "@/components/site-shell";
import { ProjectDirections } from "@/components/home-sections";

function SectionContent({ section }: { section: keyof typeof sections }) {
  const info = sections[section];
  const open = useParticipation();
  return (
    <main className="interior-page">
      <div className="page-cover">
        <div className="container-wide reveal">
          <div className="eyebrow">Вектор роста / {info.label}</div>
          <h1>{info.title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-on-ink-muted">{info.description}</p>
        </div>
      </div>
      <div className="container-wide">
        <div className="page-body reveal">
          <h2>{info.label}</h2>
          <p>{info.detail}</p>
          {info.empty && (
            <div className="empty-state">
              <Film size={30} />
              <p>{info.empty}</p>
            </div>
          )}
          <Button variant="hero" size="hero" onClick={open}>
            Предложить предприятие <ArrowUpRight />
          </Button>
        </div>
      </div>
      {section === "about" && <ProjectDirections />}
    </main>
  );
}
export function SectionPage({ section }: { section: keyof typeof sections }) {
  return (
    <SiteShell>
      <SectionContent section={section} />
    </SiteShell>
  );
}
