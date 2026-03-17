import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import ctaBg from "@/assets/cta-bg-sunset.jpg";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";

const HomeCallToActionSection = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaBg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(42 90% 70% / 0.15) 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.4)" }}
      />

      <div className="container relative z-10 mx-auto px-3 text-center sm:px-6">
        <div
          className="animate-fade-up opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <Eyebrow
            label="Contactez-nous"
            icon={<Phone className="h-4 w-4" />}
            className="border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-none"
          />
        </div>

        <h2
          className="mt-8 mb-6 font-serif text-3xl font-bold text-white animate-fade-up opacity-0 md:text-5xl lg:text-6xl"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          Prêt à découvrir le Clos du Soleil ?
        </h2>
        <p
          className="mx-auto mb-12 max-w-xl text-lg text-white/80 animate-fade-up opacity-0 md:text-xl"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Notre équipe est à votre écoute pour organiser votre séjour et
          répondre à toutes vos questions.
        </p>

        <div
          className="flex justify-center animate-fade-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <Button
            asChild
            className="group relative overflow-hidden rounded-full bg-white px-10 py-7 text-lg text-foreground shadow-elevated transition-all duration-300 hover:scale-105 hover:bg-white/95"
          >
            <Link href="/contact">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">Contactez-nous</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeCallToActionSection;
