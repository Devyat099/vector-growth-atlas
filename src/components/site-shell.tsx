import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Menu, X, ArrowUpRight } from "lucide-react";
import { Brand, Tricolor } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";

const ParticipationContext = createContext<() => void>(() => undefined);
export function useParticipation() {
  return useContext(ParticipationContext);
}
const nav = [
  { to: "/about", label: "О проекте" },
  { to: "/media", label: "Выпуски" },
  { to: "/enterprises", label: "Для предприятий" },
  { to: "/team", label: "Команда" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Header() {
  const [menu, setMenu] = useState(false);
  const open = useParticipation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <header className={`site-header ${isHome ? "" : "header-solid"}`}>
      <div className="container-wide header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Главная навигация">
          {!isHome && (
            <Link to="/" className="nav-home">
              <Home size={13} />
              На Главную
            </Link>
          )}
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button variant="glass" className="header-cta" onClick={open}>
          Стать героем выпуска <ArrowUpRight />
        </Button>
        <Button
          variant="glass"
          size="icon"
          className="menu-toggle"
          aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </Button>
      </div>
      {menu && (
        <nav className="mobile-nav" aria-label="Мобильная навигация">
          {!isHome && (
            <Link to="/" className="nav-home" onClick={() => setMenu(false)}>
              <Home size={14} />
              На Главную
            </Link>
          )}
          {nav.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenu(false)}>
              {item.label}
            </Link>
          ))}
          <Button
            variant="hero"
            onClick={() => {
              setMenu(false);
              open();
            }}
          >
            Стать героем выпуска <ArrowUpRight />
          </Button>
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-top">
          <Brand surface="light" />
          <nav className="footer-nav" aria-label="Навигация в подвале">
            {!isHome && (
              <Link to="/" className="nav-home">
                <Home size={12} />
                На Главную
              </Link>
            )}
            <Link to="/about">О проекте</Link>
            <Link to="/media">Медиацентр</Link>
            <Link to="/regions">Регионы</Link>
            <Link to="/participate">Участие в проекте</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Вектор роста. Люди. Производство. Возможности.</span>
          <span>Независимый документальный медиапроект</span>
          <Tricolor />
        </div>
      </div>
    </footer>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    scope.current.querySelectorAll('.editorial-section').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('scroll-pending');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <ParticipationContext.Provider value={() => setOpen(true)}>
      <div ref={scope}>
      <Header />
      {children}
      <Footer />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="form-dialog">
          <DialogTitle>Предложить предприятие</DialogTitle>
          <DialogDescription>
            Расскажите о производстве и людях, которых должна узнать страна.
          </DialogDescription>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </ParticipationContext.Provider>
  );
}
