import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mission } from "@/data/project";
import { Tricolor } from "@/components/brand";

// Интерактивная миссия: четыре фокуса проекта раскрыты как аккордеон —
// один пункт открыт в любой момент, переключается кликом и с клавиатуры.
export function MissionSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="editorial-section mission-section">
      <div className="container-wide">
        <div className="mission-head reveal">
          <div className="section-number">{mission.label}</div>
          <h2>{mission.title}</h2>
          <Tricolor />
        </div>

        <p className="mission-lead">{mission.lead}</p>

        <div className="mission-focus">
          <p className="mission-focus-intro">{mission.focusIntro}</p>
          <ul className="mission-focus-list" aria-label="Что показывает проект">
            {mission.focus.map((item, index) => {
              const expanded = index === active;
              return (
                <li key={item.id} className={`mission-focus-item${expanded ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="mission-focus-button"
                    aria-expanded={expanded}
                    aria-controls={`mission-panel-${item.id}`}
                    onClick={() => setActive(index)}
                  >
                    <span className="mission-focus-id">{item.id}</span>
                    <span className="mission-focus-title">{item.title}</span>
                    <ChevronDown className="mission-focus-chevron" size={18} aria-hidden />
                  </button>
                  <div
                    id={`mission-panel-${item.id}`}
                    className="mission-focus-panel"
                    aria-hidden={!expanded}
                    inert={!expanded}
                  >
                    <div className="mission-focus-panel-inner">
                      <p>{item.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <blockquote className="mission-belief">
          <svg
            className="mission-belief-vector"
            viewBox="0 0 240 14"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line className="mission-belief-line" x1="0" y1="7" x2="226" y2="7" />
            <path className="mission-belief-head" d="M222 1 L238 7 L222 13" />
          </svg>
          <p>{mission.belief}</p>
        </blockquote>
      </div>
    </section>
  );
}
