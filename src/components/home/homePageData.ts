import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  HandHeart,
  Palette,
  Plane,
  ShieldCheck,
  Stethoscope,
  Sun,
  Utensils,
} from "lucide-react";
import type { ServiceVariant } from "@/components/ServiceBlock";

export type HighlightItem = {
  eyebrow: string;
  value: string;
  detail: string;
};

export type ReasonItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  variant: ServiceVariant;
  section: "accompagnement-soins" | "vie-quotidienne-confort";
};

export const highlights: HighlightItem[] = [
  {
    eyebrow: "Accompagnement",
    value: "24 h/24",
    detail: "Sécurité et soins francophones : un ratio garanti d'un soignant par patient.",
  },
  {
    eyebrow: "Hébergement",
    value: "Hôtel 4*",
    detail: "À Monastir, dans un cadre hôtelier soigné.",
  },
  {
    eyebrow: "Tarif",
    value: "Dès 2 200 €",
    detail: "Selon la formule choisie.",
  },
];

const services: ServiceItem[] = [
  {
    id: "accompagnement-quotidien",
    title: "Accompagnement quotidien et personnalisé",
    description:
      "Un accompagnement au quotidien pour favoriser votre autonomie et sécuriser votre parcours de revalidation. Un soutien bienveillant et personnalisé qui s'adapte au rythme de chaque résident.",
    imageSrc: "/services/accompagnement.png",
    imageAlt:
      "Aide quotidienne et accompagnement bienveillant au Clos du Soleil",
    icon: HandHeart,
    variant: "soft",
    section: "accompagnement-soins",
  },
  {
    id: "accueil-transport",
    title: "Accueil et transport individuel",
    description:
      "Accueil et transport individuel depuis l'aéroport, avec une prise en charge adaptée aux personnes à mobilité réduite.",
    imageSrc: "/services/transport.png",
    imageAlt: "Service d'accueil et transport individuel depuis l'aéroport",
    icon: Plane,
    variant: "outline",
    section: "accompagnement-soins",
  },
  {
    id: "soins-medicaux",
    title: "Soins médicaux et paramédicaux",
    description:
      "Présence d'une équipe compétente composée d'infirmier(ère)s et d'un kinésithérapeute, proposant des séances de rééducation et de maintien de la mobilité adaptées aux besoins de chacun.",
    imageSrc: "/services/soins.png",
    imageAlt: "Soins médicaux et paramédicaux pour seniors",
    icon: Stethoscope,
    variant: "split",
    section: "accompagnement-soins",
  },
  {
    id: "activites-loisirs",
    title: "Activités et loisirs",
    description:
      "Ateliers créatifs, moments de détente, sorties culturelles et sociales pour stimuler le corps et l'esprit.",
    imageSrc: "/services/loisir.png",
    imageAlt: "Activités et loisirs pour les résidents",
    icon: Palette,
    variant: "glass",
    section: "vie-quotidienne-confort",
  },
  {
    id: "repas-equilibres",
    title: "Repas équilibrés et conviviaux",
    description:
      "Savourez une cuisine saine et conviviale, élaborée par notre diététicienne selon vos besoins médicaux et régimes spécifiques. Chaque repas est une parenthèse de plaisir, préparée avec des produits frais pour soutenir votre vitalité.",
    imageSrc: "/services/repas.png",
    imageAlt: "Repas équilibrés et conviviaux",
    icon: Utensils,
    variant: "outline",
    section: "vie-quotidienne-confort",
  },
  {
    id: "confort-proprete",
    title: "Confort et propreté",
    description:
      "L’hébergement en chambre moderne et spacieuse avec terrasse ou balcon privatif.\nPassage quotidien d’une femme de chambre.\nLa blanchisserie : linge de maison fourni et vêtements personnels entretenus avec soin.",
    imageSrc: "/services/confort.png",
    imageAlt: "Confort hôtelier et propreté en résidence",
    icon: BedDouble,
    variant: "soft",
    section: "vie-quotidienne-confort",
  },
];

export const introParagraphs = [
  "Notre concept de résidence pour seniors à Monastir réunit sérénité, plaisir de vivre et dignité.",
  "En combinant une présence humaine attentive, un environnement chaleureux et un accompagnement structuré, nous proposons une parenthèse de bien-être sur mesure.",
  "Que ce soit pour un court séjour ou une installation durable, Clos du Soleil cultive l'autonomie, le confort et la qualité de vie au quotidien.",
];

export const reasons: ReasonItem[] = [
  {
    icon: ShieldCheck,
    title: "L'excellence au juste prix",
    description:
      "Profitez d'un accompagnement de haut standing et de soins experts à des tarifs 40 % plus avantageux qu'en Europe, sans aucun compromis sur la qualité.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: Sun,
    title: "Un climat privilégié toute l'année",
    description:
      "Offrez-vous un cadre de vie entre mer et soleil. La douceur du climat méditerranéen est un allié naturel pour le bien-être et la vitalité.",
    accent: "from-yellow-400 to-amber-500",
  },
  {
    icon: Utensils,
    title: "Une table saine et savoureuse",
    description:
      "Une cuisine équilibrée, élaborée chaque jour à base de produits frais et locaux, avec une attention particulière portée au plaisir et aux bienfaits.",
    accent: "from-orange-500 to-rose-500",
  },
  {
    icon: HandHeart,
    title: "Un ratio humain unique",
    description:
      "Une présence soignante accrue et une structure à taille humaine qui garantissent une attention de chaque instant pour chaque résident.",
    accent: "from-amber-400 to-yellow-500",
  },
];

export const serviceIndexById = services.reduce<Record<string, number>>(
  (acc, service, index) => {
    acc[service.id] = index;
    return acc;
  },
  {},
);

export const servicesBySection: Array<{
  id: ServiceItem["section"];
  title: string;
  items: ServiceItem[];
}> = [
  {
    id: "accompagnement-soins",
    title: "Accompagnement et soins",
    items: services.filter(
      (service) => service.section === "accompagnement-soins",
    ),
  },
  {
    id: "vie-quotidienne-confort",
    title: "Vie quotidienne et confort",
    items: services.filter(
      (service) => service.section === "vie-quotidienne-confort",
    ),
  },
];
