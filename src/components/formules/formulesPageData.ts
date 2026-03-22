export type FormulaPlan = {
  id: string;
  duration: string;
  name: string;
  priceLabel: string;
  price: string;
  badge?: string;
  audienceTitle: string;
  audienceIntro: string;
  audienceBullets: string[];
  secondaryTitle: string;
  secondaryIntro: string;
  secondaryBullets: string[];
  featured?: boolean;
};

export const formulaPlans: FormulaPlan[] = [
  {
    id: "energie-convalescence",
    duration: "Séjour de courte durée",
    name: "Énergie et convalescence",
    priceLabel: "À partir de",
    price: "2 800 €",
    audienceTitle: "Pour qui ?",
    audienceIntro:
      "Cette formule sur-mesure s'adresse à ceux qui recherchent un séjour temporaire de haute qualité, alliant confort hôtelier et suivi médical rigoureux pour :",
    audienceBullets: [
      "Récupération & post-opératoire : Pour une revalidation sereine après une intervention chirurgicale.",
      "Séjours de revalidation : Un accompagnement spécifique pour retrouver autonomie et tonus.",
      "Vacances médicalisées (PMR) : Pour les personnes à mobilité réduite souhaitant profiter de la mer et du soleil en toute sécurité.",
      "Tourisme de santé : Un mois de ressourcement complet pour les voyageurs en quête de bien-être.",
    ],
    secondaryTitle: "Une flexibilité totale",
    secondaryIntro:
      "Parce que votre rétablissement ou votre plaisir n'ont pas forcément de date de fin, nous vous offrons une souplesse totale :",
    secondaryBullets: [
      "Renouvellement simple : Prolongez votre séjour d'un mois supplémentaire selon vos envies.",
      "Transition douce : Possibilité d'évoluer vers un séjour longue durée si vous décidez de faire du Clos du Soleil votre nouvelle demeure.",
    ],
  },
  {
    id: "serenite-durable",
    duration: "Séjour de longue durée",
    name: "Sérénité durable",
    priceLabel: "À partir de",
    price: "2 200 €",
    badge: "Le plus populaire",
    audienceTitle: "Pour qui ?",
    audienceIntro:
      "Plus qu'une alternative à la maison de repos classique, cette formule propose un véritable mode de vie premium pour ceux qui souhaitent s'installer durablement au calme et à la chaleur.",
    audienceBullets: [
      "Expatriation & hivernage : Pour les seniors souhaitant fuir la grisaille européenne et vivre à l'année sous un climat clément.",
      "Alternative premium à la maison de repos : Pour ceux qui exigent la même sécurité qu'en Belgique ou en France, mais avec un standing et un cadre de vie supérieurs.",
      "Autonomie & sécurité : Pour les personnes souhaitant conserver leur indépendance tout en ayant une équipe médicale à disposition 24h/24.",
    ],
    secondaryTitle: "Les plus de la longue durée",
    secondaryIntro:
      "Contrairement au séjour de convalescence, la Sérénité Durable vous offre :",
    secondaryBullets: [
      'Personnalisation de l\'espace : Aménagez votre suite avec vos souvenirs pour un véritable sentiment de "chez-soi".',
      "Accueil des proches : Parce que le lien familial est sacré, nous disposons de solutions pour accueillir et loger votre famille lors de leurs visites. Restez proches de ceux que vous aimez, sans contrainte logistique.",
      "Tarification préférentielle : Un tarif dégressif conçu pour une installation sereine sur le long terme.",
      "Priorité de soins : Un suivi médical préventif et continu pour une tranquillité d'esprit totale.",
    ],
    featured: true,
  },
];
