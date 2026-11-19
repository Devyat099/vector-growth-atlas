import { Link } from "@tanstack/react-router";
import markAsset from "@/assets/logo-mark-sm.png.asset.json";
import wordmarkLight from "@/assets/logo-wm-light-sm.png.asset.json";
import wordmarkDark from "@/assets/logo-wm-dark-sm.png.asset.json";

export function GrowthMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M12 8h44v44H43V30L17 56 8 47l26-26H12V8Z" fill="currentColor" />
    </svg>
  );
}
export function Brand({ surface = "dark" }: { surface?: "dark" | "light" }) {
  const wordmark = surface === "dark" ? wordmarkLight : wordmarkDark;
  const isGitHubPages = import.meta.env.MODE === "github-pages";
  return (
    <Link to="/" className="brand" aria-label="Вектор роста — главная">
      <img
        src={isGitHubPages ? `${import.meta.env.BASE_URL}favicon.png` : markAsset.url}
        alt=""
        className="brand-mark"
        width={233}
        height={120}
        draggable={false}
      />
      <span className="brand-text">
        {isGitHubPages ? (
          <strong className="whitespace-nowrap text-[20px] leading-none font-extrabold tracking-[-0.035em]">
            ВЕКТОР РОСТА
          </strong>
        ) : (
          <img
            src={wordmark.url}
            alt="Вектор роста"
            className="brand-wordmark"
            width={271}
            height={90}
            draggable={false}
          />
        )}
        <span className="brand-caption">Люди. Производство. Возможности.</span>
      </span>
    </Link>
  );
}
export function Tricolor() {
  return (
    <span className="tricolor" aria-label="Российский триколор">
      <i />
      <i />
      <i />
    </span>
  );
}
