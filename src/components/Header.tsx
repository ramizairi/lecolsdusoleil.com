import Link from "next/link";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <img src={logo.src} alt="Clos du Soleil" className="h-14 md:h-16 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-accessible-base font-medium text-foreground hover:text-primary transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/service"
              className="text-accessible-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-accessible-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/login"
            className="bg-gradient-sunset text-primary-foreground px-6 py-3 rounded-xl text-accessible-base font-semibold shadow-soft hover:shadow-elevated hover:scale-105 transition-all duration-300"
          >
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
