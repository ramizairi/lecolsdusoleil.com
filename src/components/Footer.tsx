import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/formules", label: "Formules" },
    { href: "/contact", label: "Contact" },
  ];

  const contactInfo = [
    {
      label: "Adresse complète",
      value: "Skanes Tourist Area - B.P. 23, 5065 Monastir, Tunisia",
      href: "https://maps.google.com/?q=Skanes+Tourist+Area+Monastir+Tunisia",
    },
    {
      label: "Numéro téléphone",
      value: "+32 2 886 06 14",
      href: "tel:+3228860614",
    },
    {
      label: "Adresse mail",
      value: "contact@leclosdusoleil.com",
      href: "mailto:contact@leclosdusoleil.com",
    },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-foreground/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(255,247,238,0.96)_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/18 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-orange-200/18 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(145, 92, 29, 0.75) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-3 py-14 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.9fr_1fr]">
          <div className="md:pr-10 md:[border-right:1px_solid_rgba(73,51,30,0.12)]">
            <img src={logo.src} alt="Clos du Soleil" className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground/68 md:text-lg">
              Résidence hôtelière pour seniors à Monastir, pensée pour conjuguer douceur, accompagnement attentif et
              qualité de vie dans un cadre chaleureux.
            </p>
          </div>

          <div className="md:px-10 md:[border-right:1px_solid_rgba(73,51,30,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Liens rapides</p>
            <nav className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-3 text-base text-foreground/72 transition-colors duration-300 hover:text-primary md:text-lg"
                >
                  <span className="h-px w-8 bg-gradient-to-r from-primary/80 to-transparent transition-all duration-300 group-hover:w-12" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:pl-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Nous trouver</p>
            <div className="mt-5 space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("https://") ? "_blank" : undefined}
                  rel={item.href.startsWith("https://") ? "noreferrer" : undefined}
                  className="block text-base leading-relaxed text-foreground/72 transition-colors duration-300 hover:text-primary md:text-lg"
                >
                  <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-foreground/42">
                    {item.label}
                  </span>
                  <span className="mt-1 block">{item.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-foreground/10 pt-7 text-sm text-foreground/52 md:flex-row md:items-center md:justify-between md:text-base">
          <p>
            © 2026 Clos du Soleil. Tous droits réservés.
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://www.ridy.tn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 transition-colors hover:text-amber-700"
            >
              Ridy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
