import SunEffect from "./SunEffect";

interface AnimatedBackgroundProps {
  variant?: "sunrise" | "sunset" | "minimal";
  className?: string;
}

const AnimatedBackground = ({ variant = "sunrise", className = "" }: AnimatedBackgroundProps) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient - richer warm tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
      
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(25 50% 40%) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      
      {variant === "sunrise" && (
        <>
          <SunEffect variant="corner" className="inset-0" />
          
          {/* Warm ambient glow */}
          <div 
            className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(28 80% 65% / 0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
              animationDuration: "18s",
              animationDelay: "3s",
            }}
          />
          
          {/* Bottom warm accent */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: "linear-gradient(to top, hsl(38 50% 90% / 0.5) 0%, transparent 100%)",
            }}
          />
        </>
      )}

      {variant === "sunset" && (
        <>
          <SunEffect variant="subtle" className="inset-0" />
          
          {/* Warm sunset glow at bottom */}
          <div 
            className="absolute -bottom-40 left-1/3 w-[700px] h-[500px] rounded-full animate-float"
            style={{
              background: "radial-gradient(ellipse, hsl(25 85% 55% / 0.1) 0%, hsl(40 80% 50% / 0.05) 50%, transparent 70%)",
              filter: "blur(60px)",
              animationDuration: "20s",
            }}
          />
          
          {/* Top warm highlight */}
          <div 
            className="absolute -top-20 right-1/4 w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(42 85% 60% / 0.1) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />

          {/* Floating orbs */}
          <div 
            className="absolute top-1/3 left-1/4 w-[150px] h-[150px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(35 80% 60% / 0.08) 0%, transparent 60%)",
              filter: "blur(30px)",
              animationDuration: "12s",
              animationDelay: "2s",
            }}
          />
        </>
      )}

      {variant === "minimal" && (
        <SunEffect variant="subtle" className="inset-0" />
      )}

      {/* Elegant noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;