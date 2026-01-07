interface SunEffectProps {
  variant?: "corner" | "center" | "subtle";
  className?: string;
}

const SunEffect = ({ variant = "corner", className = "" }: SunEffectProps) => {
  return (
    <div className={`absolute pointer-events-none overflow-hidden ${className}`}>
      {variant === "corner" && (
        <>
          {/* Main sun orb */}
          <div 
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, hsl(42 90% 65% / 0.4) 0%, hsl(25 85% 55% / 0.15) 40%, transparent 70%)",
              filter: "blur(30px)",
              animationDuration: "15s",
            }}
          />
          
          {/* Sun rays */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-40 origin-bottom"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-100%)`,
                  background: `linear-gradient(to top, hsl(42 90% 60% / ${0.15 - i * 0.01}), transparent)`,
                  filter: "blur(8px)",
                }}
              />
            ))}
          </div>

          {/* Secondary warm glow */}
          <div 
            className="absolute top-20 -right-10 w-[200px] h-[200px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(28 80% 60% / 0.2) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
        </>
      )}

      {variant === "center" && (
        <>
          {/* Central sun burst */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-gentle-pulse"
            style={{
              background: "radial-gradient(circle, hsl(42 90% 65% / 0.2) 0%, hsl(25 85% 55% / 0.08) 40%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />

          {/* Rotating rays */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] animate-rotate-slow"
            style={{ animationDuration: "60s" }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-0.5 h-60 origin-bottom"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-100%)`,
                  background: `linear-gradient(to top, hsl(42 85% 55% / 0.08), transparent)`,
                  filter: "blur(4px)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {variant === "subtle" && (
        <>
          {/* Subtle corner glow */}
          <div 
            className="absolute -top-40 -right-40 w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(40 80% 60% / 0.12) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />
          
          {/* Opposite corner hint */}
          <div 
            className="absolute -bottom-32 -left-32 w-[250px] h-[250px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(28 75% 55% / 0.08) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
        </>
      )}
    </div>
  );
};

export default SunEffect;