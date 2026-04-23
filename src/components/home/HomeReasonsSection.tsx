import { Sparkles } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import type { ReasonItem } from "@/components/home/homePageData";

type HomeReasonsSectionProps = {
  reasons: ReasonItem[];
};

const HomeReasonsSection = ({ reasons }: HomeReasonsSectionProps) => {
  return (
    <section className="px-3 py-14 sm:px-6 md:py-20">
      <div className="w-full">
        <div className="relative overflow-hidden bg-white/88 px-5 py-10 sm:px-6 md:px-10 md:py-14">
          <div className="pointer-events-none absolute -left-16 top-16 h-52 w-52 rounded-full bg-amber-200/35 blur-3xl" />
          <div className="pointer-events-none absolute right-[-3rem] bottom-0 h-64 w-64 rounded-full bg-orange-200/25 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(155, 97, 31, 0.65) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <Eyebrow
              label="Pourquoi nous choisir ?"
              icon={<Sparkles className="h-4 w-4" />}
              className="border-amber-300/60 bg-white/80 text-amber-700"
            />
            <h2 className="mt-6 font-serif text-4xl font-bold text-warm-brown md:text-5xl">
              Une résidence qui allie douceur, expertise et qualité de vie
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl">
              Une approche humaine et chaleureuse, pensée pour offrir aux
              seniors un environnement serein, stable et véritablement bien
              accompagné.
            </p>
          </div>

          <div className="relative mt-12 grid gap-6 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <article
                key={reason.title}
                className="group animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/78 p-7 shadow-[0_18px_45px_rgba(117,85,41,0.1)] opacity-0 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(117,85,41,0.15)]"
                style={{
                  animationDelay: `${140 + index * 90}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div
                  className={`pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-[2rem] bg-gradient-to-b ${reason.accent} opacity-[0.12] blur-2xl`}
                />
                <div className="pointer-events-none absolute right-5 top-4 text-[4rem] font-serif font-bold leading-none text-foreground/[0.05]">
                  0{index + 1}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.accent} shadow-lg`}
                    >
                      <reason.icon className="h-5 w-5 text-white" />
                    </div>
                    <div
                      className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${reason.accent}`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-warm-brown">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-foreground/72">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReasonsSection;
