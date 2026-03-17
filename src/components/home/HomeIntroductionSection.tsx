type HomeIntroductionSectionProps = {
  paragraphs: string[];
};

const HomeIntroductionSection = ({
  paragraphs,
}: HomeIntroductionSectionProps) => {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <div
          className="relative isolate mx-auto max-w-6xl animate-fade-up overflow-hidden rounded-[2.75rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.9)_0%,rgba(255,250,244,0.78)_55%,rgba(255,246,235,0.88)_100%)] opacity-0 shadow-[0_28px_80px_rgba(115,84,43,0.12)] ring-1 ring-white/70 md:rounded-[3rem]"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="pointer-events-none absolute right-[-3rem] top-0 h-72 w-72 rounded-full bg-orange-200/22 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(145, 92, 29, 0.7) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-40 bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />

          <div className="relative px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
              <h2 className="mt-6 font-serif text-4xl font-bold leading-[0.95] text-warm-brown md:text-5xl lg:text-6xl">
                Qui sommes-nous ?
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/74 md:text-xl lg:text-[1.38rem]">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-10 max-w-3xl animate-fade-up text-center opacity-0 md:mt-14"
          style={{ animationDelay: "220ms", animationFillMode: "forwards" }}
        >
          <div
            className="flex items-center justify-center gap-4 md:gap-6"
            aria-hidden="true"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-foreground/20 to-primary/50 md:w-28" />
            <div className="relative flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary/80" />
              <div className="absolute h-10 w-10 rounded-full bg-primary/10 blur-xl" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-primary/50 via-foreground/20 to-transparent md:w-28" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeIntroductionSection;
