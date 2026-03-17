import { cn } from "@/lib/utils";
import type { FormulaPlan } from "@/components/formules/formulesPageData";

type FormulaCardProps = {
  formula: FormulaPlan;
  index: number;
};

const FormulaCard = ({ formula, index }: FormulaCardProps) => {
  return (
    <article
      id={formula.id}
      className={cn(
        "group relative animate-fade-up overflow-hidden rounded-[2.4rem] border bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(255,249,242,0.92)_55%,rgba(255,246,236,0.98)_100%)] px-5 py-7 opacity-0 shadow-[0_26px_70px_rgba(116,84,43,0.1)] ring-1 ring-white/80 sm:px-6 md:px-10 md:py-10 lg:px-12 lg:py-12",
        formula.featured
          ? "border-primary/35 shadow-[0_34px_90px_rgba(205,126,41,0.16)]"
          : "border-black/8",
      )}
      style={{
        animationDelay: `${140 + index * 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,211,77,0.12)_0%,rgba(252,211,77,0)_34%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08)_0%,rgba(249,115,22,0)_32%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(145, 92, 29, 0.7) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute right-[-4rem] top-0 h-48 w-48 rounded-full bg-orange-200/22 blur-3xl" />

      {formula.badge ? (
        <div className="relative mb-6">
          <span className="inline-flex rounded-full border border-primary/30 bg-white/92 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary shadow-soft">
            {formula.badge}
          </span>
        </div>
      ) : null}

      <div className="relative">
        <div className="grid gap-5 border-b border-foreground/10 pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
          <div>
            <div className="h-px w-16 bg-gradient-to-r from-primary via-amber-300 to-transparent" />
            <p className="mt-5 text-2xl font-medium tracking-[-0.03em] text-foreground/86 md:text-3xl">
              {formula.duration}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold italic leading-tight text-warm-brown md:text-5xl">
              {formula.name}
            </h2>
          </div>

          <div className="flex items-end gap-4 lg:flex-col lg:items-end lg:gap-1">
            <span className="text-lg text-foreground/68 md:text-xl">{formula.priceLabel}</span>
            <span className="font-serif text-4xl font-bold tracking-[-0.04em] text-warm-brown md:text-6xl">
              {formula.price}
            </span>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-2xl font-semibold text-warm-brown md:text-[2rem]">{formula.audienceTitle}</h3>
          <p className="mt-3 text-xl italic leading-relaxed text-foreground/74 md:text-[1.45rem]">
            {formula.audienceIntro}
          </p>
          <ul className="mt-7 space-y-3 pl-6 text-lg leading-relaxed text-foreground/76 marker:text-primary md:text-[1.28rem]">
            {formula.audienceBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="mt-9 border-t border-foreground/10 pt-7">
          <h3 className="text-2xl font-semibold text-warm-brown md:text-[2rem]">{formula.secondaryTitle}</h3>
          <p className="mt-3 text-xl italic leading-relaxed text-foreground/74 md:text-[1.45rem]">
            {formula.secondaryIntro}
          </p>
          <ul className="mt-7 space-y-3 pl-6 text-lg leading-relaxed text-foreground/76 marker:text-primary md:text-[1.28rem]">
            {formula.secondaryBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default FormulaCard;
