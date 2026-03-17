import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

const ServiceContactSection = () => {
  return (
    <section className="px-6 pb-20 pt-10 md:pb-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(255,248,238,0.9)_100%)] px-6 py-10 shadow-elevated md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.16)_0%,rgba(251,191,36,0)_68%)]" />
          <div className="pointer-events-none absolute right-[-4rem] top-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(155, 97, 31, 0.65) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <Eyebrow
              label="Bas de page"
              icon={<Sparkles className="h-4 w-4" />}
              className="border-amber-300/60 bg-white/85 text-amber-700"
            />
            <h2 className="mt-6 font-serif text-4xl font-bold text-warm-brown md:text-5xl">Contactez-nous</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground/72 md:text-xl">
              Notre equipe vous accompagne pour choisir la formule adaptee et organiser votre sejour dans les meilleures
              conditions.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-sunset px-7 py-4 text-lg font-semibold text-primary-foreground shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:gap-4"
            >
              Contactez-nous
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContactSection;
