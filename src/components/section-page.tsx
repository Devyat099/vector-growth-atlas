import { Film, ArrowUpRight, ChevronDown, Factory } from "lucide-react";
import { sections, demoEnterprises, images } from "@/data/project";
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
          {section === "enterprises" && (
            <div className="enterprise-grid">
              {demoEnterprises.map((item) => (
                <details key={item.id} className="enterprise-card">
                  <summary>
                    <img
                      className="enterprise-card-photo"
                      src={images[item.image]}
                      alt=""
                      loading="lazy"
                    />
                    <span className="enterprise-card-icon">
                      <Factory size={22} />
                    </span>
                    <span className="enterprise-card-head">
                      <span className="enterprise-card-name">{item.name}</span>
                      <span className="enterprise-card-tagline">{item.tagline}</span>
                    </span>
                    <ChevronDown className="enterprise-card-chevron" size={20} />
                  </summary>
                  <div className="enterprise-card-body">
                    <p>{item.description}</p>
                    <ul>
                      {item.facts.map((fact) => (
                        <li key={fact}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          )}
          {info.empty && section !== "enterprises" && (
            <div className="empty-state">
              <Film size={30} />
              <p>{info.empty}</p>
            </div>
          )}
          {section !== "enterprises" && section !== "team" && (
            <Button variant="hero" size="hero" onClick={open}>
              Предложить предприятие <ArrowUpRight />
            </Button>
          )}
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
