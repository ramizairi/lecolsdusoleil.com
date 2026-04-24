import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";
import { useRouter } from "next/router";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import PageIntroSection from "@/components/PageIntroSection";
import Seo from "@/components/Seo";
import ServiceContactSection from "@/components/ServiceContactSection";
import ServiceSiteHeader from "@/components/ServiceSiteHeader";
import { cn } from "@/lib/utils";

type ServiceBullet = {
  label: string;
  text: string;
};

type DetailedService = {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  bullets: ServiceBullet[];
  imageSrc: string;
  imageAlt: string;
};

const detailedServices: DetailedService[] = [
  {
    id: "accompagnement-quotidien",
    title: "Accompagnement quotidien",
    subtitle: "Une présence ajustée à chacun",
    intro:
      "Un accompagnement délicat, présent sans jamais brusquer. Nos équipes soutiennent chaque résident dans les gestes de la vie courante, avec attention, discrétion et respect du rythme personnel.",
    bullets: [
      {
        label: "Gestes essentiels",
        text: "Aide au lever, à l'habillage, à la toilette et aux déplacements lorsque cela est nécessaire, toujours avec bienveillance.",
      },
      {
        label: "Rythme personnel",
        text: "Chaque accompagnement s'adapte aux habitudes, à l'autonomie et aux préférences du résident pour préserver ses repères.",
      },
      {
        label: "Lien rassurant",
        text: "Une équipe stable reste présente au quotidien pour offrir écoute, continuité et sérénité aux résidents comme à leurs proches.",
      },
    ],
    imageSrc: "/services/accompagnement.png",
    imageAlt: "Accompagnement quotidien et présence bienveillante au Clos du Soleil",
  },
  {
    id: "accueil-transport",
    title: "Une Logistique Porte à Porte",
    subtitle: "De votre domicile au soleil",
    intro:
      "Nous effaçons les distances pour votre confort. L'aventure au Clos du Soleil commence dès le seuil de votre porte en Europe. Contrairement aux séjours classiques, nous organisons votre transfert privé depuis votre domicile jusqu'à l'aéroport de départ.",
    bullets: [
      {
        label: "Prise en charge totale",
        text: "Un chauffeur vous assiste avec vos bagages jusqu'à l'enregistrement.",
      },
      {
        label: "Accueil à l'arrivée",
        text: "À votre atterrissage en Tunisie, notre équipe vous attend pour un transfert individuel vers notre établissement.",
      },
      {
        label: "Accessibilité PMR",
        text: "Tous nos véhicules de transfert sont équipés pour accueillir confortablement les personnes à mobilité réduite et leurs équipements.",
      },
    ],
    imageSrc: "/services/transport.png",
    imageAlt: "Transport privé et accueil à l'arrivée pour les résidents",
  },
  {
    id: "confort-proprete",
    title: "Confort Hôtelier 4*",
    subtitle: "Un séjour de plain-pied",
    intro:
      "Le charme d'un hôtel, l'accessibilité en plus. Le Clos du Soleil est un établissement 4 étoiles pensé pour l'autonomie et la sécurité. Oubliez les contraintes architecturales : ici, tout est fluide.",
    bullets: [
      {
        label: "Chambres en rez-de-chaussée",
        text: "Pour votre confort et votre sécurité, l'ensemble de nos chambres est situé au rez-de-chaussée. Plus besoin d'emprunter d'ascenseur, vous accédez directement aux jardins et aux espaces de vie.",
      },
      {
        label: "Salles de bains privatives PMR",
        text: "Chaque chambre dispose d'une salle de bains privative entièrement conçue pour l'accessibilité, avec douches à l'italienne, barres d'appui et sièges de douche.",
      },
      {
        label: "Entretien quotidien",
        text: "La propreté des lieux, le linge de maison et l'entretien des effets personnels sont assurés avec le soin attendu d'une adresse haut de gamme.",
      },
    ],
    imageSrc: "/services/confort.png",
    imageAlt: "Chambre confortable et environnement hôtelier accessible",
  },
  {
    id: "soins-medicaux",
    title: "Soins Médicaux & Paramédicaux",
    subtitle: "Une vigilance de chaque instant",
    intro:
      "La sécurité médicale intégrée à votre quotidien. Bien que vous logiez dans un cadre hôtelier, votre santé reste notre priorité absolue. Nous offrons une structure de soins médicalisés pour seniors unique en Tunisie.",
    bullets: [
      {
        label: "Infirmiers & Médecins",
        text: "Une équipe d'infirmiers diplômés assure une garde 24h/24. Un médecin coordonnateur assure le suivi de votre dossier de santé.",
      },
      {
        label: "Rééducation & Kinésithérapie",
        text: "Nos kinésithérapeutes interviennent directement sur place pour vos séances de revalidation ou de maintien de la forme physique.",
      },
      {
        label: "Coordination des soins",
        text: "Nous assurons la liaison avec vos médecins en Europe pour garantir la continuité de vos traitements.",
      },
    ],
    imageSrc: "/services/soins.png",
    imageAlt: "Equipe médicale et paramédicale dédiée aux seniors",
  },
  {
    id: "repas-equilibres",
    title: "Gastronomie",
    subtitle: "L'équilibre parfait avec notre diététicienne",
    intro:
      "Une table gourmande adaptée à vos besoins. Parce que bien manger est le secret d'une bonne santé, notre restaurant 4* met l'accent sur la fraîcheur.",
    bullets: [
      {
        label: "Menus personnalisés",
        text: "En collaboration avec notre diététicienne, nous élaborons des repas sains, équilibrés et adaptés à vos régimes spécifiques, sans jamais renoncer au plaisir.",
      },
      {
        label: "Fraîcheur locale",
        text: "La proximité de la mer nous permet de vous proposer des produits de la pêche du jour et des fruits gorgés de soleil, essentiels pour faire le plein de vitamines.",
      },
      {
        label: "Moments conviviaux",
        text: "Les repas deviennent de vrais instants de partage, dans un cadre lumineux et apaisé qui valorise autant la saveur que le bien-être.",
      },
    ],
    imageSrc: "/services/repas.png",
    imageAlt: "Cuisine équilibrée et repas conviviaux au Clos du Soleil",
  },
  {
    id: "activites-loisirs",
    title: "Activités & Découvertes",
    subtitle: "Dynamisme et Culture",
    intro:
      "Vivre la Tunisie, entre détente et patrimoine. Le Clos du Soleil n'est pas qu'un lieu de repos, c'est un lieu de vie vibrant.",
    bullets: [
      {
        label: "Aquagym & Bien-être",
        text: "Profitez de notre piscine pour des séances d'aquagym douce, idéales pour soulager les articulations et tonifier le corps.",
      },
      {
        label: "Vie sociale & Jeux",
        text: "Participez à nos après-midis conviviaux: tournois de bingo, jeux de société ou rendez-vous thématiques.",
      },
      {
        label: "Culture & Patrimoine",
        text: "Nous organisons des visites guidées et des excursions pour découvrir la ville, son architecture et l'histoire millénaire de la Tunisie en toute sécurité.",
      },
    ],
    imageSrc: "/services/loisir.png",
    imageAlt: "Activités culturelles, sociales et bien-être en résidence",
  },
];

const ServicesPage = () => {
  const router = useRouter();
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const hash = router.asPath.split("#")[1];
    if (!hash) {
      setFocusedServiceId(null);
      return;
    }

    const targetId = decodeURIComponent(hash);
    const scrollTimer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      setFocusedServiceId(targetId);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    const clearTimer = window.setTimeout(() => {
      setFocusedServiceId((current) => (current === targetId ? null : current));
    }, 2400);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [router.asPath, router.isReady]);

  return (
    <>
      <Seo
        title="Services détaillés - Clos du Soleil"
        description="Découvrez en détail les services du Clos du Soleil : accompagnement quotidien, transport, confort hôtelier, soins, gastronomie et activités."
        canonicalPath="/services"
      />

      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AnimatedBackground variant="sunrise" />

        <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
          <div className="absolute left-1/2 top-32 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber-300/14 blur-3xl" />
          <div className="absolute -left-20 top-[30rem] h-80 w-80 rounded-full bg-orange-200/16 blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-yellow-200/18 blur-3xl" />
        </div>

        <ServiceSiteHeader activeKey="services" logoMode="always" />

        <main className="relative z-10">
          <PageIntroSection
            label="Services"
            title="Services"
            icon={<Stethoscope className="h-4 w-4" />}
            description="Découvrez, service après service, la manière dont Clos du Soleil organise un séjour fluide, rassurant et profondément humain."
            sectionClassName="px-3 pb-14 pt-36 sm:px-6 md:pb-20 md:pt-40"
          />

          <section className="px-3 pb-14 sm:px-6 md:pb-20">
            <div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:gap-10">
              {detailedServices.map((service, index) => {
                const isFocused = focusedServiceId === service.id;
                const isReversed = index % 2 === 1;

                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className={cn(
                      "group relative scroll-mt-32 overflow-hidden rounded-[2.25rem] border bg-[linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(255,249,242,0.88)_52%,rgba(255,246,236,0.96)_100%)] px-5 py-5 shadow-[0_26px_70px_rgba(116,84,43,0.1)] ring-1 ring-white/75 transition-all duration-700 md:scroll-mt-36 md:px-7 md:py-7 xl:px-8 xl:py-8",
                      isFocused
                        ? "border-primary/30 shadow-[0_34px_90px_rgba(205,126,41,0.18)] ring-2 ring-primary/18"
                        : "border-black/8 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_30px_80px_rgba(116,84,43,0.14)]",
                    )}
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

                    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-10 xl:gap-14">
                      <div className={cn("relative", isReversed && "lg:order-2")}>
                        <div className="absolute inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(255,223,163,0.22)_0%,rgba(255,223,163,0)_72%)] blur-3xl" />
                        <div className="relative overflow-hidden rounded-[1.9rem] bg-white/80 p-2 shadow-[0_20px_50px_rgba(120,88,43,0.14)] ring-1 ring-white/80">
                          <div className="overflow-hidden rounded-[1.45rem]">
                            <img
                              src={service.imageSrc}
                              alt={service.imageAlt}
                              className="h-[250px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-[330px] xl:h-[370px]"
                              loading="lazy"
                            />
                          </div>
                          <div className="pointer-events-none absolute inset-x-6 bottom-5 h-16 rounded-full bg-gradient-to-t from-black/18 to-transparent blur-xl" />
                        </div>
                      </div>

                      <div className={cn("relative px-2 py-2 md:px-3", isReversed && "lg:order-1")}>
                        <div className="h-px w-24 bg-gradient-to-r from-primary via-amber-300/90 to-transparent" />
                        <h2 className="mt-6 font-serif text-3xl font-bold leading-[1.02] text-warm-brown md:text-5xl">
                          {service.title.replace(/Porte à Porte/g, "Porte\u00A0à\u00A0Porte")}
                        </h2>
                        <p className="mt-3 text-xl italic leading-relaxed text-foreground/68 md:text-[1.9rem]">
                          {service.subtitle}
                        </p>
                        <p className="mt-8 text-lg leading-relaxed text-foreground/76 md:text-[1.35rem]">
                          {service.intro}
                        </p>

                        <ul className="mt-8 space-y-4 pl-6 text-lg leading-relaxed text-foreground/76 marker:text-primary md:text-[1.28rem]">
                          {service.bullets.map((bullet) => (
                            <li key={`${service.id}-${bullet.label}`}>
                              <span className="font-semibold text-warm-brown">{bullet.label} :</span> {bullet.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <ServiceContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
