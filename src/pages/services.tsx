import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HandHeart, Plane, Stethoscope, Palette, Utensils, BedDouble, Phone, MessageCircle, ArrowRight, Sparkles, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import SunEffect from "@/components/SunEffect";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import ServiceBlock, { type ServiceVariant } from "@/components/ServiceBlock";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import ctaBg from "@/assets/cta-bg-sunset.jpg";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  variant: ServiceVariant;
  icon: LucideIcon;
};

const Services = () => {
  const services: ServiceItem[] = [
    {
      id: "accompagnement-quotidien",
      icon: HandHeart,
      title: "Accompagnement quotidien et personnalisé",
      description: "Accompagnement quotidien et personnalisé : aide aux gestes de la vie courante avec respect et discrétion.",
      imageSrc: "/services/accompagnement-quotidien-placeholder.svg",
      imageAlt: "Aide quotidienne et accompagnement bienveillant au Clos du Soleil",
      variant: "soft",
    },
    {
      id: "accueil-transport",
      icon: Plane,
      title: "Accueil et transport individuel",
      description: "Accueil et transport individuel depuis l'aéroport, avec une prise en charge adaptée aux personnes à mobilité réduite.",
      imageSrc: "/services/accueil-transport-placeholder.svg",
      imageAlt: "Service d'accueil et transport individuel depuis l'aéroport",
      variant: "outline",
    },
    {
      id: "soins-medicaux",
      icon: Stethoscope,
      title: "Soins médicaux et paramédicaux",
      description: "Présence d'une équipe compétente composée d'infirmier(ère)s et d'un kinésithérapeute, proposant des séances de rééducation et de maintien de la mobilité adaptées aux besoins de chacun.",
      imageSrc: "/services/soins-medicaux-placeholder.svg",
      imageAlt: "Suivi médical et paramédical personnalisé pour seniors",
      variant: "split",
    },
    {
      id: "activites-loisirs",
      icon: Palette,
      title: "Activités et loisirs",
      description: "Ateliers créatifs, moments de détente, sorties culturelles et sociales pour stimuler le corps et l'esprit.",
      imageSrc: "/services/activites-loisirs-placeholder.svg",
      imageAlt: "Activités créatives et moments de loisirs pour les résidents",
      variant: "glass",
    },
    {
      id: "repas-equilibres",
      icon: Utensils,
      title: "Repas équilibrés et conviviaux",
      description: "Repas équilibrés et conviviaux : préparés avec soin et adaptés aux besoins de chacun, avec la formule all inclusive soft.",
      imageSrc: "/services/repas-equilibres-placeholder.svg",
      imageAlt: "Repas équilibrés et conviviaux servis en résidence",
      variant: "outline",
    },
    {
      id: "confort-proprete",
      icon: BedDouble,
      title: "CONFORT ET PROPRETÉ",
      description:
        "L’hébergement en chambre moderne et spacieuse avec terrasse ou balcon privatif.\nPassage quotidien d’une femme de chambre.\nLa blanchisserie : linge de maison fourni et vêtements personnels entretenus avec soin.",
      imageSrc: "/services/confort-proprete-placeholder.svg",
      imageAlt: "Chambre confortable et entretenue quotidiennement pour les résidents",
      variant: "soft",
    },
  ];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryApi, setGalleryApi] = useState<CarouselApi>();

  const openLightboxAt = (index: number) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    if (!galleryApi) {
      return;
    }

    const onSelect = () => {
      setActiveImageIndex(galleryApi.selectedScrollSnap());
    };

    onSelect();
    galleryApi.on("select", onSelect);
    galleryApi.on("reInit", onSelect);

    return () => {
      galleryApi.off("select", onSelect);
      galleryApi.off("reInit", onSelect);
    };
  }, [galleryApi]);

  useEffect(() => {
    if (!isLightboxOpen || !galleryApi) {
      return;
    }

    galleryApi.scrollTo(activeImageIndex, true);
  }, [isLightboxOpen, galleryApi, activeImageIndex]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        galleryApi?.scrollPrev();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        galleryApi?.scrollNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, galleryApi]);

  const handleCall = () => {
    window.location.href = "tel:+3228860614";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/32465200310?text=Bonjour, je souhaite en savoir plus sur vos services.", "_blank");
  };

  return (
    <>
      <Seo
        title="Nos Services - Clos du Soleil | Résidence Hôtelière pour Seniors en Tunisie"
        description="Découvrez nos services : accompagnement quotidien et personnalisé, soins médicaux et paramédicaux, transport aéroport, activités et repas équilibrés au Clos du Soleil en Tunisie."
      />

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="sunset" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 md:py-28 relative">
            <SunEffect variant="corner" className="inset-0 z-0" />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow label="Nos Services" icon={<Sparkles className="w-4 h-4" />} className="text-lg" />
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Une gamme complète pour{" "}
                <span className="text-gradient-sunset">votre bien-être</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Au Clos du Soleil, nous offrons une gamme complète de services pour le bien-être de nos résidents.
              </p>
            </div>
          </section>

          {/* Services Stack */}
          <section className="py-16 md:py-20 bg-card/55 backdrop-blur-sm border-y border-border/50 relative">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto space-y-7 md:space-y-10">
                {services.map((service, index) => (
                  <ServiceBlock
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    imageSrc={service.imageSrc}
                    imageAlt={service.imageAlt}
                    icon={service.icon}
                    variant={service.variant}
                    index={index}
                    onImageClick={() => openLightboxAt(index)}
                  />
                ))}
              </div>
              <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mt-12">
                Chaque service est pensé pour offrir confort, sécurité et plaisir de vivre, tout en respectant le rythme et les envies de nos résidents.
              </p>
            </div>
          </section>

          <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-6xl border-white/20 bg-black/85 p-2 sm:p-4 md:p-6 shadow-none [&>button]:h-10 [&>button]:w-10 [&>button]:rounded-full [&>button]:border [&>button]:border-white/30 [&>button]:bg-black/40 [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:bg-black/60">
              <DialogTitle className="sr-only">Galerie des images de services</DialogTitle>
              <DialogDescription className="sr-only">
                Visualisez les images des services en plein écran et balayez de gauche à droite.
              </DialogDescription>

              <div className="relative">
                <Carousel
                  setApi={setGalleryApi}
                  opts={{ loop: true, align: "start" }}
                  className="w-full touch-pan-y"
                  aria-label="Galerie des services"
                >
                  <CarouselContent className="-ml-0">
                    {services.map((service) => (
                      <CarouselItem key={service.id} className="pl-0">
                        <figure className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                          <img
                            src={service.imageSrc}
                            alt={service.imageAlt}
                            className="h-[58vh] w-full rounded-xl border border-white/20 bg-black/20 object-contain sm:h-[68vh]"
                          />
                          <figcaption className="px-4 text-center text-white/85">
                            <p className="font-serif text-2xl font-semibold">{service.title}</p>
                            <p className="mt-1 text-sm tracking-wide text-white/70">
                              {activeImageIndex + 1} / {services.length}
                            </p>
                          </figcaption>
                        </figure>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                <button
                  type="button"
                  onClick={() => galleryApi?.scrollPrev()}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/45 p-2 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-4 sm:p-3"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={() => galleryApi?.scrollNext()}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/45 p-2 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-4 sm:p-3"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Qui sommes-nous Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />

            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow label="Qui sommes-nous ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Le Clos du Soleil, une résidence dédiée au bien-être
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le Clos du Soleil est une résidence hôtelière pour seniors située en Tunisie. Nous accueillons des personnes âgées dans un cadre calme, sécurisé et bienveillant. Nous offrons un accompagnement quotidien, des soins personnalisés et une attention particulière au bien-être et à la dignité de chaque résident.
                </p>
              </div>
            </div>
          </section>

          {/* Pourquoi nous choisir Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow label="Pourquoi nous choisir ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  La Tunisie, un cadre de vie idéal
                </h2>
                <h3 className="font-serif text-3xl md:text-lg font-bold text-amber-600 uppercase mb-6">
                  Le coût en Tunisie est moins cher de <span className="text-2xl">40%</span> qu'en Europe
                </h3>
                <div className="text-lg text-muted-foreground  leading-relaxed space-y-3">
                  <p>La Tunisie, c’est la sécurité, le soleil, la mer et un climat agréable.</p>
                  <p>C’est aussi une alimentation fraîche et équilibrée.</p>
                  <p>Au Clos du Soleil, nous offrons à chaque résident une attention personnalisée et un cadre de vie apaisant.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section with Background Image */}
          <section className="py-32 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={ctaBg.src}
                alt="" 
                className="w-full h-full object-cover"
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
            </div>
            
            {/* Sun rays effect */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
              <div 
                className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(42 90% 70% / 0.15) 0%, transparent 50%)",
                  filter: "blur(40px)",
                }}
              />
            </div>
            
            {/* Vignette */}
            <div className="absolute inset-0 z-[1]" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.4)' }} />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow
                  label="Contactez-nous"
                  icon={<Phone className="w-4 h-4" />}
                  className="text-amber-300 border-amber-400/30 bg-amber-400/10 shadow-none"
                />
              </div>
              
              <h2 
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-8 mb-6 animate-fade-up opacity-0"
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Prêt à découvrir le Clos du Soleil ?
              </h2>
              <p 
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-12 animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Notre équipe est à votre écoute pour organiser votre séjour et répondre à toutes vos questions.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-white text-foreground hover:bg-white/95 text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Appelez-nous</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-[#25D366] hover:bg-[#20BD5A] border-none text-white text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">WhatsApp</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
