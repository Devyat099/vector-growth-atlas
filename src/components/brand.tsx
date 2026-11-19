import { Link } from "@tanstack/react-router";

export function GrowthMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M12 8h44v44H43V30L17 56 8 47l26-26H12V8Z" fill="currentColor" />
    </svg>
  );
}
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Вектор роста — главная">
      <GrowthMark className="brand-mark" />
      <span className="brand-name">
        ВЕКТОР РОСТА<span className="brand-caption">Люди. Производство. Возможности.</span>
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
