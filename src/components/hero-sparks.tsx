import { useMemo } from "react";

type Spark = {
  left: number;
  top: number;
  size: number;
  depth: number;
  delay: number;
  duration: number;
  drift: number;
};

/**
 * Decorative glowing sparks layered over the hero photo.
 * They drift and flicker on their own and shift slightly
 * with the cursor via the --mx / --my variables set on .hero.
 */
export function HeroSparks() {
  const sparks = useMemo<Spark[]>(() => {
    // Deterministic pseudo-random sequence so SSR and client match.
    let seed = 42;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    return Array.from({ length: 26 }, () => ({
      // Concentrate sparks on the right half, where the welder works.
      left: 34 + rand() * 62,
      top: 12 + rand() * 76,
      size: 2 + rand() * 3.4,
      depth: 6 + rand() * 22,
      delay: -(rand() * 9),
      duration: 4.5 + rand() * 5,
      drift: 14 + rand() * 30,
    }));
  }, []);

  return (
    <div className="hero-sparks" aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            ["--depth" as string]: s.depth,
          }}
        >
          <span
            className="spark-dot"
            style={{
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              ["--drift" as string]: `${s.drift}px`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
