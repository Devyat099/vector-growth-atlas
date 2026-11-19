import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import paths from "@/data/region-paths.json";
import { Button } from "@/components/ui/button";
import { useParticipation } from "@/components/site-shell";

const centers = new Map(
  paths.map((region) => {
    const nums = (region.path ?? "").match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i + 1 < nums.length; i += 2) {
      minX = Math.min(minX, (nums[i] ?? 0)); maxX = Math.max(maxX, (nums[i] ?? 0));
      minY = Math.min(minY, (nums[i + 1] ?? 0)); maxY = Math.max(maxY, (nums[i + 1] ?? 0));
    }
    return [region.id, { x: (minX + maxX) / 2, y: (minY + maxY) / 2 }] as const;
  }),
);

function hash(text: string) {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function RouteArrows({ regionId }: { regionId: string }) {
  const routes = useMemo(() => {
    const from = centers.get(regionId);
    if (!from) return [];
    const seed = hash(regionId);
    const count = 5 + (seed % 3);
    const others = paths
      .filter((r) => r.id !== regionId)
      .map((r) => {
        const c = centers.get(r.id)!;
        return { id: r.id, ...c, d: Math.hypot(c.x - from.x, c.y - from.y) };
      })
      .filter((r) => r.d > 25)
      .sort((a, b) => a.d - b.d);
    // mix of near neighbours and a few far destinations
    const near = others.slice(0, 14);
    const far = others.slice(14);
    const picked: typeof others = [];
    let s = seed;
    const rnd = () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) >>> 0) % 10000) / 10000;
    const pool = [...near];
    while (picked.length < count - 2 && pool.length) picked.push(...pool.splice(Math.floor(rnd() * pool.length), 1));
    while (picked.length < count && far.length) picked.push(...far.splice(Math.floor(rnd() * Math.min(far.length, 30)), 1));
    return picked.map((to, i) => {
      const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
      const dx = to.x - from.x, dy = to.y - from.y;
      const bend = (i % 2 ? 1 : -1) * 0.25;
      const cx = mx - dy * bend, cy = my + dx * bend - to.d * 0.1;
      return { id: to.id, to, d: `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`, delay: i * 0.18 };
    });
  }, [regionId]);
  return (
    <g className="map-routes" key={regionId} aria-hidden="true" pointerEvents="none">
      <defs>
        <marker id="route-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="route-head" />
        </marker>
      </defs>
      {routes.map((r) => (
        <g key={r.id}>
          <path d={r.d} pathLength={1} className="route-line" style={{ animationDelay: `${r.delay}s` }} markerEnd="url(#route-head)" />
          <g transform={`translate(${r.to.x},${r.to.y})`}>
            <g className="route-pin" style={{ animationDelay: `${r.delay + 0.9}s` }}>
              <circle r="9" className="route-pulse" style={{ animationDelay: `${r.delay + 0.9}s` }} />
              <path d="M0,0 C-4,-5 -6,-8 -6,-11 A6,6 0 1 1 6,-11 C6,-8 4,-5 0,0 z" className="route-pin-body" />
              <circle cy="-11" r="2.2" className="route-pin-dot" />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

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
          <RouteArrows key={selected.id} regionId={selected.id} />
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
