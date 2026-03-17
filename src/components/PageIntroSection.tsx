import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow";
import { cn } from "@/lib/utils";

type PageIntroSectionProps = {
  label: string;
  title: string;
  icon?: ReactNode;
  description?: string;
  className?: string;
  sectionClassName?: string;
};

const PageIntroSection = ({
  label,
  title,
  icon,
  description,
  className,
  sectionClassName,
}: PageIntroSectionProps) => {
  return (
    <section
      className={cn("px-3 pb-10 pt-36 sm:px-6 md:pb-14 md:pt-40", sectionClassName)}
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={cn(
            "relative mx-auto max-w-4xl animate-fade-up text-center opacity-0",
            className,
          )}
          style={{ animationFillMode: "forwards" }}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />
          <Eyebrow
            label={label}
            icon={icon}
            className="border-amber-300/80 bg-white/40 text-amber-700 shadow-[0_16px_40px_rgba(228,181,82,0.12)]"
          />
          <h1 className="mt-7 font-serif text-5xl font-bold tracking-[-0.04em] text-gradient-sunset md:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-foreground/72 md:text-2xl">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PageIntroSection;
