import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-11 h-11 rounded-full bg-secondary/80 dark:bg-white/10 hover:bg-secondary dark:hover:bg-white/20 border border-border/50 dark:border-white/20 hover:border-primary/30 dark:hover:border-white/40 transition-all duration-300 group overflow-hidden"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {/* Sun icon */}
      <Sun 
        className={`absolute w-5 h-5 text-primary transition-all duration-500 ${
          isDark 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      {/* Moon icon */}
      <Moon 
        className={`absolute w-5 h-5 text-blue-300 transition-all duration-500 ${
          isDark 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
        isDark 
          ? "bg-blue-400/10" 
          : "bg-primary/10"
      }`} />
    </Button>
  );
};

export default ThemeToggle;
