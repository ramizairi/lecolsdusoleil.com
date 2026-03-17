import Image from "next/image";
import { Sun } from "lucide-react";
import heroImage from "@/assets/hero-luxury.jpg";
import logo from "@/assets/logo.png";
import Eyebrow from "@/components/Eyebrow";
import type { HighlightItem } from "@/components/home/homePageData";

type HomeHeroSectionProps = {
  highlights: HighlightItem[];
  topSpacing?: "default" | "compact";
};

const HomeHeroSection = ({
  highlights,
  topSpacing = "default",
}: HomeHeroSectionProps) => {
  return (
    <section
      className={`relative flex min-h-screen items-center overflow-hidden px-3 pb-16 sm:px-6 md:pb-24 ${
        topSpacing === "compact" ? "pt-28 md:pt-32" : "pt-36 md:pt-40"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center -220px" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/48 via-amber-50/76 to-orange-50/86" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/44 via-white/20 to-amber-100/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.92)_0%,rgba(255,247,236,0.8)_30%,rgba(255,247,236,0.42)_55%,rgba(255,247,236,0.08)_78%,rgba(255,247,236,0)_100%)]" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 150px rgba(255,248,240,0.42)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-100/55 to-transparent" />
      </div>

      <div className="container relative mx-auto">
        <div className="mx-auto max-w-5xl text-center">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,252,246,0.34)_100%)] px-3 py-7 shadow-[0_28px_80px_rgba(114,83,42,0.12)] backdrop-blur-md sm:rounded-[2.5rem] sm:px-4 sm:py-8 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-6 h-15 rounded-full bg-[radial-gradient(circle,rgba(255,214,153,0.2)_0%,rgba(255,214,153,0)_72%)] blur-3xl" />

            <div
              className="relative mx-auto mt-2 flex max-w-3xl animate-fade-up flex-col items-center opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-4 mx-auto h-44 w-44 rounded-full bg-gradient-to-br from-amber-300/55 via-orange-200/35 to-transparent blur-3xl md:h-56 md:w-56" />
              <div className="pointer-events-none absolute left-1/2 top-12 h-24 w-80 -translate-x-1/2 rounded-full bg-white/70 blur-3xl md:w-[26rem]" />

              <div className="relative flex flex-col items-center">
                <Image
                  src={logo}
                  alt="Logo Clos du Soleil"
                  priority
                  className="h-28 w-auto drop-shadow-[0_24px_40px_rgba(191,116,35,0.18)] md:h-32"
                />
                <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
                <p className="mt-6 font-serif text-3xl font-semibold tracking-[-0.03em] text-warm-brown drop-shadow-[0_10px_24px_rgba(255,255,255,0.35)] md:text-5xl">
                  La douceur du soleil,
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold tracking-[-0.03em] text-gradient-sunset drop-shadow-[0_10px_24px_rgba(255,255,255,0.32)] md:text-5xl">
                  la chaleur humaine.
                </p>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-xl">
                  Résidence hôtelière pour seniors à Monastir, entre
                  accompagnement attentif, confort haut de gamme et douceur
                  méditerranéenne.
                </p>
              </div>
            </div>

            <div
              className="mt-8 animate-fade-up opacity-0"
              style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
            >
              <Eyebrow
                label="Séjours pour seniors"
                icon={<Sun className="h-4 w-4" />}
                className="border-amber-300/70 bg-white/88 text-amber-700 shadow-[0_16px_38px_rgba(232,181,82,0.12)]"
              />
            </div>

            <div
              className="mt-8 grid animate-fade-up gap-4 opacity-0 md:grid-cols-3"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              {highlights.map((item) => (
                <div
                  key={item.value}
                  className="relative overflow-hidden rounded-[1.6rem] border border-foreground/10 bg-white/78 px-5 py-6 text-center shadow-[0_14px_34px_rgba(122,93,52,0.08)] backdrop-blur-sm sm:rounded-[1.75rem] sm:px-6 md:min-h-[11.5rem]"
                >
                  <div className="pointer-events-none absolute inset-x-10 top-0 h-16 bg-[radial-gradient(circle,rgba(255,215,150,0.18)_0%,rgba(255,215,150,0)_72%)] blur-2xl" />
                  <div className="relative flex h-full flex-col items-center justify-center">
                    <div className="h-px w-14 bg-gradient-to-r from-transparent via-primary/75 to-transparent" />
                    <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground/55 md:text-xs">
                      {item.eyebrow}
                    </p>
                    <p className="mt-3 font-serif text-4xl font-bold leading-none text-warm-brown md:text-5xl">
                      {item.value}
                    </p>
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-foreground/68 md:text-base">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
