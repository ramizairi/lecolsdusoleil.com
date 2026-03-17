import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type HeaderKey = "home" | "services" | "formules" | "contact" | "none";

type ServiceSiteHeaderProps = {
  activeKey?: HeaderKey;
  className?: string;
  logoMode?: "scroll" | "always";
};

const navItems = [
  { key: "home" as const, href: "/", label: "Accueil" },
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

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 md:px-6", className)}>
      <div className="container mx-auto max-w-6xl px-0">
        <div
          className={cn(
            "relative rounded-full border px-4 py-3 transition-all duration-500 md:px-6",
            isScrolled
              ? "border-white/40 bg-white/55 shadow-[0_20px_60px_rgba(104,77,41,0.16)] backdrop-blur-xl"
              : "border-transparent bg-white/0 shadow-none backdrop-blur-none",
          )}
        >
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
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
                const linkClasses = cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-5 md:text-base",
                  isScrolled
                    ? "border-foreground/10 bg-white/65 text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                    : "border-white/35 bg-white/20 text-foreground hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/30",
                  activeKey === item.key &&
                    (isScrolled ? "border-primary/45 bg-primary/10 text-primary" : "border-primary/40 bg-white/35 text-primary"),
                );

                return (
                  <Link key={`${item.href}-${item.label}`} href={item.href} className={linkClasses}>
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

          <div className="mt-3 flex justify-center md:hidden">
            <a
              href="tel:+3228860614"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                isScrolled
                  ? "border border-amber-300/60 bg-white/80 text-warm-brown shadow-soft"
                  : "border border-white/35 bg-white/20 text-warm-brown",
              )}
            >
              <Phone className="h-4 w-4" />
              Appeler
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ServiceSiteHeader;
