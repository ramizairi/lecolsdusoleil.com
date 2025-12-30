import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <img src={logo} alt="Clos du Soleil" className="h-12 w-auto" />
            <p className="text-accessible-base text-muted-foreground max-w-xs">
              Prendre soin de nos aînés avec dignité, compassion et excellence depuis plus de 20 ans.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-accessible-lg font-semibold text-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-accessible-base text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/about" className="text-accessible-base text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
              <Link to="/services" className="text-accessible-base text-muted-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-accessible-base text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-accessible-lg font-semibold text-foreground">
              Contact
            </h4>
            <div className="space-y-3 text-accessible-base text-muted-foreground">
              <p>📍 123 Avenue du Soleil, Paris</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>✉️ contact@closdusoleil.fr</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center">
          <p className="text-muted-foreground text-accessible-sm">
            © 2024 Clos du Soleil. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
