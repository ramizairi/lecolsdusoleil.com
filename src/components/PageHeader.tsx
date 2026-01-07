import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  showBack?: boolean;
  variant?: "light" | "dark";
}

const PageHeader = ({ showBack = true, variant = "light" }: PageHeaderProps) => {
  const isDark = variant === "dark";
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isDark 
        ? "bg-black/30 border-white/10" 
        : "bg-white/70 dark:bg-black/30 border-border/50 dark:border-white/10"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Back button or Logo */}
          <div className="flex items-center gap-4">
            {showBack && (
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`rounded-full transition-all duration-300 ${
                    isDark 
                      ? "text-white/80 hover:text-white hover:bg-white/10" 
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            )}
            
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Clos du Soleil" 
                  className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
                />
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 blur-xl bg-amber-400/20 -z-10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Right - Theme toggle and Login */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link to="/login">
              <Button 
                variant="ghost"
                className={`relative overflow-hidden rounded-full px-6 py-2 backdrop-blur-sm transition-all duration-300 group ${
                  isDark
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/20 hover:border-amber-400/50"
                    : "text-foreground/90 hover:text-foreground bg-foreground/5 hover:bg-foreground/10 border border-border hover:border-primary/50"
                }`}
              >
                <span className="relative z-10 font-semibold">Connexion</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;