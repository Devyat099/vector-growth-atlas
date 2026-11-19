import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import paths from "@/data/region-paths.json";
import { Button } from "@/components/ui/button";
import { useParticipation } from "@/components/site-shell";

export function InteractiveRussiaMap({ initialRegion }: { initialRegion?: string | undefined }) {
  const [selected, setSelected] = useState(
    paths.find((region) => region.id === initialRegion) ??
      paths.find((region) => region.name === "Свердловская область") ??
      paths[0],
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const open = useParticipation();
  if (!selected) return null;
  return (
    <div className="geo-layout">
      <div className="map-area">
        <div className="map-status">
          <MapPin size={13} />
          <span>{hovered ?? "Промышленная Россия — от региона к региону"}</span>
        </div>
        <svg
          viewBox="0 0 960 510"
          className="russia-map"
          role="group"
          aria-label="Карта регионов России"
        >
          {paths.map((region) => (
            <path
              key={region.id}
              d={region.path ?? ""}
              className={`map-region ${selected.id === region.id ? "selected" : ""}`}
              onMouseEnter={() => setHovered(region.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(region)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(region);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={region.name}
              aria-pressed={selected.id === region.id}
            >
              <title>{region.name}</title>
            </path>
          ))}
        </svg>
        <div className="map-legend">
          <span>
            <i />
            Регионы проекта
          </span>
          <span>
            <i />
            Выбранный регион
          </span>
        </div>
        <p className="map-source">
          Границы: Click That ’Hood / OpenStreetMap, ODbL. Набор 2013 года; не отражает последующие
          изменения.
        </p>
      </div>
      <aside className="region-panel">
        <div className="region-tag">Регион в фокусе</div>
        <h3>{selected.name}</h3>
        <select
          className="region-select"
          aria-label="Выбрать регион"
          value={selected.id}
          onChange={(event) =>
            setSelected(paths.find((region) => region.id === event.target.value) ?? selected)
          }
        >
          {[...paths]
            .sort((a, b) => a.name.localeCompare(b.name, "ru"))
            .map((region) => (
              <option value={region.id} key={region.id}>
                {region.name}
              </option>
            ))}
        </select>
        <p>
          В этом регионе пока нет опубликованных материалов. Ваше предприятие может стать частью
          первой истории.
        </p>
        <Button variant="hero" onClick={open}>
          Предложить предприятие <ArrowUpRight />
        </Button>
        <Button variant="link" className="mt-3 px-0" asChild>
          <Link to="/regions" search={{ region: selected.id }}>
            Подробнее о регионе <ArrowUpRight />
          </Link>
        </Button>
      </aside>
    </div>
  );
}
