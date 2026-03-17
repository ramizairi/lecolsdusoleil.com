import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type HeaderKey = "accueil" | "services" | "formules" | "contact" | "none";

type ServiceSiteHeaderProps = {
  activeKey?: HeaderKey;
  className?: string;
  logoMode?: "scroll" | "always";
};

const navItems = [
  { key: "accueil" as const, href: "/", label: "Accueil" },
  { key: "services" as const, href: "/services", label: "Services" },
  { key: "formules" as const, href: "/formules", label: "Formules" },
  { key: "contact" as const, href: "/contact", label: "Nous contacter" },
];

const ServiceSiteHeader = ({
  activeKey = "none",
  className,
  logoMode = "always",
}: ServiceSiteHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLogoVisible = logoMode === "always" || isScrolled;
  const isHomeOverlayMode = logoMode === "scroll" && !isScrolled && !isMobileMenuOpen;

  const desktopLinkClasses = (isActive: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-5 md:text-base",
      isScrolled
        ? "border-foreground/10 bg-white/65 text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
        : "border-white/35 bg-white/20 text-foreground hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/30",
      isActive &&
        (isScrolled
          ? "border-primary/45 bg-primary/10 text-primary"
          : "border-primary/40 bg-white/35 text-primary"),
    );

  const mobileLinkClasses = (isActive: boolean) =>
    cn(
      "rounded-2xl border px-4 py-3 text-base font-semibold transition-all duration-300",
      isActive
        ? "border-primary/35 bg-primary/10 text-primary"
        : "border-white/65 bg-white/72 text-foreground hover:border-primary/25 hover:text-primary",
    );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 px-1.5 pt-4 transition-all duration-500 sm:px-4 md:px-6", className)}>
      <div className="container mx-auto max-w-6xl px-0">
        {isMobileMenuOpen ? (
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-0 bg-[rgba(255,248,240,0.28)] backdrop-blur-md md:hidden"
          />
        ) : null}

        <div
          className={cn(
            "relative z-10 rounded-full px-4 py-3 transition-all duration-500 md:hidden",
            isHomeOverlayMode
              ? "border border-transparent bg-transparent shadow-none backdrop-blur-none"
              : "border border-white/45 bg-[rgba(255,252,247,0.72)] shadow-[0_20px_60px_rgba(104,77,41,0.16)] backdrop-blur-2xl",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className={cn(
                "overflow-hidden transition-all duration-500",
                isLogoVisible
                  ? "max-h-16 max-w-[10rem] translate-x-0 opacity-100"
                  : "pointer-events-none max-h-0 max-w-0 -translate-x-4 opacity-0",
              )}
              aria-hidden={!isLogoVisible}
              tabIndex={isLogoVisible ? 0 : -1}
            >
              <img
                src={logo.src}
                alt="Clos du Soleil"
                className="h-10 w-auto drop-shadow-[0_18px_30px_rgba(185,121,37,0.18)]"
              />
            </Link>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:border-primary/35 hover:text-primary",
                isHomeOverlayMode
                  ? "border border-white/35 bg-white/18 text-warm-brown shadow-none backdrop-blur-none"
                  : "border border-white/70 bg-white/78 text-warm-brown shadow-soft",
              )}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMobileMenuOpen ? (
            <div className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-[1.8rem] border border-white/60 bg-[rgba(255,252,247,0.82)] p-3 shadow-[0_28px_80px_rgba(104,77,41,0.18)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-20 bg-[radial-gradient(circle,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}-mobile`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileLinkClasses(activeKey === item.key)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <a
                href="tel:+3228860614"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/60 bg-white/80 px-4 py-3 text-base font-semibold text-warm-brown shadow-soft transition-all duration-300 hover:border-primary/35 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "relative hidden rounded-full border px-4 py-3 transition-all duration-500 md:block md:px-6",
            isScrolled
              ? "border-white/40 bg-white/55 shadow-[0_20px_60px_rgba(104,77,41,0.16)] backdrop-blur-xl"
              : "border-transparent bg-white/0 shadow-none backdrop-blur-none",
          )}
        >
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/"
              className={cn(
                "overflow-hidden transition-all duration-500",
                isLogoVisible
                  ? "max-h-16 max-w-[11rem] translate-x-0 opacity-100 md:mr-2"
                  : "pointer-events-none max-h-0 max-w-0 -translate-x-4 opacity-0",
              )}
              aria-hidden={!isLogoVisible}
              tabIndex={isLogoVisible ? 0 : -1}
            >
              <img
                src={logo.src}
                alt="Clos du Soleil"
                className="h-11 w-auto drop-shadow-[0_18px_30px_rgba(185,121,37,0.18)]"
              />
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {navItems.map((item) => {
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={desktopLinkClasses(activeKey === item.key)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <a
                href="tel:+3228860614"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-soft transition-all duration-300 hover:-translate-y-0.5",
                  isScrolled
                    ? "border border-amber-300/60 bg-white/80 text-warm-brown hover:border-primary/40 hover:text-primary"
                    : "border border-white/35 bg-white/20 text-warm-brown hover:border-white/60 hover:bg-white/30",
                )}
              >
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ServiceSiteHeader;
