import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

const Eyebrow = ({ label, icon, className }: EyebrowProps) => {
  const normalizedLabel = label.replace(/\s([!?;:])/g, "\u00A0$1");

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-center text-sm font-bold uppercase tracking-[0.12em] text-primary shadow-soft backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-lg sm:tracking-[0.2em]",
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="leading-tight">{normalizedLabel}</span>
    </span>
  );
};

export default Eyebrow;
