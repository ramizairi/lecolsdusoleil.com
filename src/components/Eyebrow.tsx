import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

const Eyebrow = ({ label, icon, className }: EyebrowProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 text-lg font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm shadow-soft",
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
};

export default Eyebrow;
