import Link from "next/link";
import { MapPin, Phone, Mail, Home, Info, Stethoscope, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const navLinks = [
    { to: "/", label: "Accueil", icon: Home },
    { to: "/about", label: "À propos", icon: Info },
    { to: "/services", label: "Services", icon: Stethoscope },
    { to: "/contact", label: "Contact", icon: MessageSquare },
  ];

  const contactInfo = [
    { icon: Phone, text: "+32 2 886 06 14" },
    { icon: Mail, text: "contact@leclosdusoleil.com" },
  ];

  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <img src={logo.src} alt="Clos du Soleil" className="h-12 w-auto" />
            <p className="text-accessible-base text-muted-foreground max-w-xs">
              Séjour de qualité dans une résidence-hôtel pour les personnes âgées en Tunisie, en bord de mer, située dans une ville touristique, avec services personnalisés et assistance médicale.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-accessible-lg font-semibold text-foreground">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="flex items-center gap-2 text-accessible-base text-muted-foreground hover:text-primary transition-colors group"
                >
                  <link.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-accessible-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <p key={index} className="flex items-center gap-3 text-accessible-base text-muted-foreground">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </span>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex items-center justify-between">
          <p className="text-muted-foreground text-accessible-sm">© 2026 Clos du Soleil. Tous droits réservés.</p>
          <p>
            Developed by <a href="https://www.ridy.tn" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors text-amber-600">Ridy</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
