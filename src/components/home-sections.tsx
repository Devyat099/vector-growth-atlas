import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDown,
  Factory,
  BriefcaseBusiness,
  TrendingUp,
  CircleArrowRight,
} from "lucide-react";
import { directions, images } from "@/data/project";
import { GrowthMark, Tricolor } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { useParticipation } from "@/components/site-shell";
import { InteractiveRussiaMap } from "@/components/interactive-russia-map";

export function HeroSection() {
  const open = useParticipation();
  return (
    <section className="hero">
      <img
        className="hero-image"
        src={images.welding}
        alt="Сварщик за работой: искры и металл в производственном цехе"
        fetchPriority="high"
      />
      <div className="container-wide hero-content reveal">
        <div className="eyebrow">
          <Tricolor />
          Федеральный документальный медиапроект
        </div>
        <h1>
          ВЕКТОР
          <span className="hero-title-row">
            РОСТА
            <GrowthMark className="hero-arrow" />
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
            <h2>Одна страна. Много возможностей.</h2>
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
export function GeographySection() {
  return (
    <section className="editorial-section geo-section">
      <div className="container-wide">
        <div className="section-top">
          <div>
            <div className="section-number">02 / География проекта</div>
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
export function ParticipationSection() {
  const open = useParticipation();
  return (
    <section className="editorial-section participation">
      <GrowthMark className="participation-arrow" />
      <div className="container-wide participation-inner">
        <div>
          <div className="section-number">03 / Станьте частью проекта</div>
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
