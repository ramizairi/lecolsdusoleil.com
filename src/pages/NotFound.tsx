import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground variant="minimal" />
      
      <div className="text-center relative z-10 px-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
          <AlertTriangle className="w-12 h-12 text-primary" />
        </div>
        
        {/* 404 */}
        <h1 
          className="text-8xl md:text-9xl font-bold text-foreground font-serif mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          404
        </h1>
        
        {/* Message */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Oups ! Cette page n'existe pas
        </p>
        
        {/* Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <Link to="/">
            <Button className="gap-2 py-6 px-8 rounded-xl bg-gradient-sunset hover:opacity-90 text-lg">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="gap-2 py-6 px-8 rounded-xl text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
