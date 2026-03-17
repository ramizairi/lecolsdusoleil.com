import Link from "next/link";

const FormulesChoiceSection = () => {
  return (
    <section className="px-6 pb-12 pt-4 md:pb-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-[2.2rem] bg-white/55 px-6 py-8 shadow-[0_20px_60px_rgba(114,83,42,0.08)] ring-1 ring-white/70 backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-10 lg:py-10">
          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-foreground/76 md:text-[1.45rem]">
              Inclus dans tous nos séjours :
            </p>
            <p className="mt-3 text-xl leading-relaxed text-foreground/76 md:text-[1.45rem]">
              Tous nos résidents profitent du même standard d'excellence en matière de soins et de confort, à découvrir
              dans notre section{" "}
              <Link href="/service" className="font-semibold text-primary transition-colors hover:text-warm-brown">
                Services
              </Link>
              .
            </p>
          </div>

          <div className="text-center lg:min-w-[20rem] lg:text-right">
            <h2 className="font-serif text-3xl font-bold tracking-[-0.03em] text-warm-brown md:text-5xl">
              Besoin d'aide pour choisir?
            </h2>
            <a
              href="tel:+3228860614"
              className="mt-6 inline-flex rounded-full border border-primary/35 bg-white/88 px-7 py-3 text-lg font-semibold text-warm-brown shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary md:px-9 md:py-4 md:text-xl"
            >
              Appelez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormulesChoiceSection;
