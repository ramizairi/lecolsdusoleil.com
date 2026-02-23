import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceVariant = "soft" | "outline" | "split" | "glass";

type ServiceBlockProps = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  variant: ServiceVariant;
  index: number;
  onImageClick: () => void;
};

const overlayPatternByVariant: Record<ServiceVariant, CSSProperties> = {
  soft: {
    background:
      "radial-gradient(circle at 12% 18%, rgba(251, 146, 60, 0.18) 0, rgba(251, 146, 60, 0) 44%), radial-gradient(circle at 90% 80%, rgba(251, 113, 133, 0.16) 0, rgba(251, 113, 133, 0) 48%)",
  },
  outline: {
    backgroundImage: "radial-gradient(rgba(217, 119, 6, 0.16) 1px, transparent 1px)",
    backgroundSize: "14px 14px",
    opacity: 0.45,
    maskImage: "linear-gradient(to left, black 28%, transparent 86%)",
  },
  split: {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0 56%, rgba(254, 243, 199, 0.6) 56% 100%)",
  },
  glass: {
    background:
      "linear-gradient(130deg, rgba(255, 255, 255, 0.05) 0, rgba(255, 255, 255, 0.5) 42%, rgba(255, 255, 255, 0.1) 100%), radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.24), transparent 40%)",
  },
};

const stylesByVariant: Record<
  ServiceVariant,
  {
    wrapper: string;
    content: string;
    badge: string;
    title: string;
    description: string;
    imageFrame: string;
    image: string;
    accent: string;
  }
> = {
  soft: {
    wrapper:
      "bg-gradient-to-br from-amber-50/95 via-white to-rose-50/70 border-amber-200/70 shadow-soft",
    content: "lg:pr-4",
    badge: "bg-white/85 text-amber-700 border border-amber-200/90 shadow-sm",
    title: "text-warm-brown",
    description: "text-foreground/75",
    imageFrame:
      "rounded-[1.8rem] border border-white/90 bg-white/85 p-3 shadow-elevated hover:-translate-y-1 hover:shadow-glow",
    image: "rounded-[1.2rem]",
    accent: "from-amber-400 to-rose-400",
  },
  outline: {
    wrapper: "bg-white border-amber-300/80 shadow-soft md:border-l-[10px] md:border-l-amber-400",
    content: "lg:pr-3",
    badge: "bg-amber-50 text-amber-800 border border-amber-200",
    title: "text-foreground",
    description: "text-foreground/70",
    imageFrame:
      "rounded-[1.5rem] border-2 border-amber-200 bg-white p-2 shadow-soft hover:-translate-y-1 hover:shadow-elevated",
    image: "rounded-[1.05rem]",
    accent: "from-amber-500 to-orange-500",
  },
  split: {
    wrapper: "bg-white border-amber-200/80 shadow-soft",
    content: "lg:pr-8",
    badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border border-amber-400/60",
    title: "text-warm-brown",
    description: "text-foreground/75",
    imageFrame:
      "rounded-[1.6rem] border border-amber-300/80 bg-gradient-to-br from-white to-amber-50 p-4 shadow-elevated hover:-translate-y-1 hover:shadow-glow",
    image: "rounded-[1rem]",
    accent: "from-amber-400 to-orange-500",
  },
  glass: {
    wrapper:
      "bg-gradient-to-br from-orange-200/25 via-white/35 to-amber-100/30 border-white/70 backdrop-blur-md shadow-[0_18px_40px_rgba(140,92,35,0.16)]",
    content: "lg:pr-5",
    badge: "bg-white/45 text-amber-900 border border-white/80 backdrop-blur-md",
    title: "text-foreground",
    description: "text-foreground/75",
    imageFrame:
      "rounded-[1.9rem] border border-white/80 bg-white/45 p-3 backdrop-blur-lg shadow-[0_18px_45px_rgba(125,84,34,0.2)] hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(125,84,34,0.28)]",
    image: "rounded-[1.25rem]",
    accent: "from-amber-300 to-rose-300",
  },
};

const ServiceBlock = ({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  icon: Icon,
  variant,
  index,
  onImageClick,
}: ServiceBlockProps) => {
  const styles = stylesByVariant[variant];

  return (
    <article
      id={id}
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border transition-all duration-500 animate-fade-up opacity-0",
        "px-6 py-7 sm:px-10 sm:py-10 lg:px-14 lg:py-12",
        styles.wrapper,
      )}
      style={{
        animationDelay: `${150 + index * 90}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={overlayPatternByVariant[variant]} aria-hidden="true" />

      {variant === "split" && (
        <div
          className="absolute top-0 bottom-0 left-[56%] w-px bg-amber-300/55 hidden md:block pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] md:gap-12 lg:gap-16">
        <div className={cn("space-y-5", styles.content)}>
          <div className={cn("inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.08em] uppercase", styles.badge)}>
            <Icon className="h-4 w-4" />
            <span>Service dédié</span>
          </div>

          <h2 className={cn("font-serif text-3xl font-bold leading-tight md:text-4xl", styles.title)}>{title}</h2>

          <p className={cn("max-w-2xl whitespace-pre-line text-lg leading-relaxed", styles.description)}>{description}</p>

          <div className={cn("h-1.5 w-28 rounded-full bg-gradient-to-r", styles.accent)} aria-hidden="true" />
        </div>

        <div className="w-full md:justify-self-end">
          <button
            type="button"
            onClick={onImageClick}
            className="w-full cursor-zoom-in rounded-[1.9rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Ouvrir l'image du service: ${title}`}
          >
            <figure className={cn("relative overflow-hidden transition-all duration-500", styles.imageFrame)}>
              <img
                src={imageSrc}
                alt={imageAlt}
                draggable={false}
                className={cn(
                  "h-[240px] w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-[300px] md:h-[340px]",
                  styles.image,
                )}
                loading="lazy"
              />
              <div className="absolute inset-x-4 bottom-4 h-16 rounded-full bg-gradient-to-t from-black/25 to-transparent blur-xl" aria-hidden="true" />
            </figure>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceBlock;
