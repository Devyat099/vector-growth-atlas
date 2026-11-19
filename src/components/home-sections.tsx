import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDown,
  Factory,
  BriefcaseBusiness,
  TrendingUp,
  CircleArrowRight,
  ClipboardList,
  Video,
  Clapperboard,
  Rocket,
  ShieldCheck,
  Lock,
  HardHat,
} from "lucide-react";
import { directions, episode, images } from "@/data/project";
import { GrowthMark, Tricolor } from "@/components/brand";
import { HeroSparks } from "@/components/hero-sparks";
import markAsset from "@/assets/logo-mark-lg.png.asset.json";
import { Button } from "@/components/ui/button";
import { useParticipation } from "@/components/site-shell";
import { InteractiveRussiaMap } from "@/components/interactive-russia-map";

export function HeroSection() {
  const open = useParticipation();
  return (
    <section
      className="hero"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
        e.currentTarget.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--mx", "0");
        e.currentTarget.style.setProperty("--my", "0");
      }}
    >
      <img
        className="hero-image"
        src={images.welding}
        alt="Сварщик за работой: искры и металл в производственном цехе"
        fetchPriority="high"
      />
      <HeroSparks />
      <div className="container-wide hero-content reveal">
        <div className="eyebrow">
          <Tricolor />
          Федеральный документальный медиапроект
        </div>
        <h1>
          ВЕКТОР
          <span className="hero-title-row">
            РОСТА
            <img
            src={import.meta.env.MODE === "github-pages" ? `${import.meta.env.BASE_URL}favicon.png` : markAsset.url}
            alt=""
            className="hero-arrow"
            width={466}
            height={240}
            draggable={false}
          />
          </span>
        </h1>
        <p className="hero-tagline">Сила производства. Истории людей.</p>
        <p className="hero-description">
          Раскрываем реальные истории людей и предприятий,
          <br className="hidden sm:block" /> достижения современной промышленности и возможности
          <br className="hidden sm:block" /> профессионального развития в России.
        </p>
        <div className="hero-actions">
          <Button variant="hero" size="hero" asChild>
            <Link to="/about">
              О проекте <ArrowUpRight />
            </Link>
          </Button>
          <Button variant="glass" size="hero" onClick={open}>
            Предложить предприятие <ArrowUpRight />
          </Button>
        </div>
      </div>
      <div className="hero-photo-label">
        <span className="photo-dot" />
        ПРОИЗВОДСТВО В ДЕТАЛЯХ
      </div>
      <div className="container-wide hero-bottom">
        <div className="hero-bottom-label">
          <span />
          ЛЮДИ. ПРОИЗВОДСТВО. ВОЗМОЖНОСТИ.
        </div>
        <a
          href="#directions"
          className="flex items-center gap-3 text-on-ink-muted"
          aria-label="Перейти к направлениям проекта"
        >
          Узнать больше <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
export function DirectionCard({ direction }: { direction: (typeof directions)[number] }) {
  const Icon =
    direction.kind === "business"
      ? TrendingUp
      : direction.kind === "employment"
        ? BriefcaseBusiness
        : direction.kind === "enterprises"
          ? Factory
          : CircleArrowRight;
  return (
    <Link to={direction.to} className={`direction-card reveal ${direction.kind}`}>
      {direction.image && <img src={direction.image} alt="" loading="lazy" />}
      <div className="direction-top">
        <span>{direction.id} / НАПРАВЛЕНИЕ</span>
        <ArrowUpRight size={20} className="direction-link-arrow" />
      </div>
      {!direction.image && <Icon className="direction-art" strokeWidth={0.7} />}
      <div className="direction-content">
        <h3>{direction.title}</h3>
        <p>{direction.description}</p>
      </div>
    </Link>
  );
}
export function ProjectDirections() {
  return (
    <section className="editorial-section" id="directions">
      <div className="container-wide">
        <div className="section-top">
          <div>
            <div className="section-number">01 / Векторы развития</div>
            <h2>Одна страна. Миллион возможностей.</h2>
          </div>
          <p className="section-summary">
            Четыре направления, которые объединяют людей,
            <br className="hidden sm:block" /> производство и будущее промышленной России.
          </p>
        </div>
        <div className="direction-grid">
          {directions.map((direction) => (
            <DirectionCard key={direction.id} direction={direction} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function EpisodeSection() {
  return (
    <section className="editorial-section episode-section">
      <div className="container-wide">
        <div className="section-top">
          <div>
            <div className="section-number">02 / {episode.label}</div>
            <h2>
              {episode.titleLines[0]}{" "}
              <br className="hidden sm:block" />
              {episode.titleLines[1]}
            </h2>
          </div>
          <div className="episode-duration">
            <strong>{episode.duration}</strong>
            {episode.durationLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
        <div className="episode-grid">
          {episode.parts.map((part) => (
            <article key={part.id} className="episode-card reveal">
              <div className="episode-media">
                <img src={part.image} alt={part.alt} loading="lazy" />
              </div>
              <div className="episode-card-body">
                <h3>
                  <span>{part.id}</span>
                  {part.title}
                </h3>
                <p>{part.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function GeographySection() {
  return (
    <section className="editorial-section geo-section">
      <div className="container-wide">
        <div className="section-top">
          <div>
            <div className="section-number">03 / География проекта</div>
            <h2>Вся Россия — в фокусе.</h2>
          </div>
          <p className="section-summary">
            Открываем промышленный потенциал регионов России, рассказываем о предприятиях,
            технологиях и людях.
          </p>
        </div>
        <InteractiveRussiaMap />
      </div>
    </section>
  );
}
const processSteps = [
  {
    id: "01",
    icon: ClipboardList,
    title: "Подготовка и сценарий",
    text: "Согласовываем план съёмок, список спикеров и пропуски. Полная безопасность до выезда.",
  },
  {
    id: "02",
    icon: Video,
    title: "Один съёмочный день",
    text: "Съёмочная группа из 3–4 человек снимает цеха, процессы и интервью в рабочем ритме.",
  },
  {
    id: "03",
    icon: Clapperboard,
    title: "Монтаж и согласование",
    text: "Вы проверяете и утверждаете черновой монтаж до публикации. Соблюдаем коммерческую тайну.",
  },
  {
    id: "04",
    icon: Rocket,
    title: "Премьера и дистрибуция",
    text: "Выход фильма о предприятии и вертикальных роликов в соцсетях проекта.",
  },
];

const processGuarantees = [
  {
    icon: ShieldCheck,
    title: "Без остановки линий",
    text: "Снимаем в рабочем ритме, не мешая выполнению плана.",
  },
  {
    icon: Lock,
    title: "Коммерческая тайна",
    text: "В кадр попадает только то, что разрешено руководством.",
  },
  {
    icon: HardHat,
    title: "Строго по ТБ",
    text: "Команда проходит инструктаж и работает в касках и СИЗ.",
  },
];

export function ProcessSection() {
  return (
    <section className="editorial-section process-section">
      <div className="container-wide">
        <div className="section-top">
          <div>
            <div className="section-number">04 / Как это устроено</div>
            <h2>Как проходят съёмки: один день, который не отвлечёт от работы.</h2>
          </div>
          <p className="section-summary">
            Съёмки проходят в естественном рабочем ритме. Мы берём на себя все процессы — от
            сценария до финального монтажа.
          </p>
        </div>
        <ol className="process-grid">
          {processSteps.map((step) => (
            <li key={step.id} className="process-step reveal">
              <div className="process-step-head">
                <span className="process-step-number">{step.id}</span>
                <step.icon className="process-step-icon" strokeWidth={1.4} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="process-guarantees">
          {processGuarantees.map((item) => (
            <div key={item.title} className="process-guarantee">
              <item.icon className="process-guarantee-icon" strokeWidth={1.6} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ParticipationSection() {
  const open = useParticipation();
  return (
    <section className="editorial-section participation">
      <GrowthMark className="participation-arrow" />
      <div className="container-wide participation-inner">
        <div>
          <div className="section-number">05 / Станьте частью проекта</div>
          <h2>
            Расскажите о своём
            <br />
            предприятии всей стране.
          </h2>
        </div>
        <div>
          <p>
            Покажите своё производство, расскажите о технологиях и людях, которые стоят за успехом
            вашей компании. Предложите предприятие для участия в документальном проекте «Вектор
            роста».
          </p>
          <Button variant="hero" size="hero" onClick={open}>
            Предложить предприятие <ArrowUpRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
