interface AnimatedBackgroundProps {
  variant?: "sunrise" | "sunset" | "minimal";
  className?: string;
}

const AnimatedBackground = ({ variant = "sunrise", className = "" }: AnimatedBackgroundProps) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-soft" />
      
      {variant === "sunrise" && (
        <>
          {/* Main sun orb - elegant and subtle */}
          <div 
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(40 85% 70% / 0.15) 0%, hsl(15 85% 60% / 0.08) 40%, transparent 70%)",
              filter: "blur(40px)",
              animationDuration: "12s",
            }}
          />
          
          {/* Secondary warm glow */}
          <div 
            className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(25 80% 65% / 0.1) 0%, transparent 60%)",
              filter: "blur(50px)",
              animationDuration: "15s",
              animationDelay: "2s",
            }}
          />
          
          {/* Soft accent blob */}
          <div 
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(35 75% 60% / 0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
              animationDuration: "18s",
              animationDelay: "4s",
            }}
          />

          {/* Light rays effect */}
          <div 
            className="absolute top-0 right-0 w-full h-1/2 opacity-20"
            style={{
              background: "linear-gradient(180deg, hsl(40 80% 70% / 0.1) 0%, transparent 100%)",
            }}
          />
        </>
      )}

      {variant === "sunset" && (
        <>
          {/* Warm sunset orb */}
          <div 
            className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(15 85% 55% / 0.12) 0%, hsl(35 80% 50% / 0.06) 50%, transparent 70%)",
              filter: "blur(50px)",
              animationDuration: "14s",
            }}
          />
          
          {/* Golden accent */}
          <div 
            className="absolute top-1/3 -right-20 w-[350px] h-[350px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(40 85% 60% / 0.1) 0%, transparent 60%)",
              filter: "blur(45px)",
              animationDuration: "16s",
              animationDelay: "3s",
            }}
          />

          {/* Coral highlight */}
          <div 
            className="absolute top-20 left-1/4 w-[250px] h-[250px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(20 75% 60% / 0.08) 0%, transparent 60%)",
              filter: "blur(40px)",
              animationDuration: "20s",
              animationDelay: "1s",
            }}
          />
        </>
      )}

      {variant === "minimal" && (
        <>
          {/* Subtle corner accent */}
          <div 
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(35 70% 65% / 0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          
          {/* Bottom left subtle glow */}
          <div 
            className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(20 70% 60% / 0.06) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />
        </>
      )}

      {/* Noise texture overlay for elegance */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;