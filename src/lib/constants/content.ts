// Types pour structurer les données du site

export interface DomainItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Nom de l'icône Lucide correspondant
}

export interface ImpactCard {
  id: string;
  numberValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number; // Pour les nombres décimaux comme 3.8
  iconName: string;
}

export interface PortraitItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  gender: 'H' | 'F';
  badge: string;
  initials: string;
  gradientFrom: string; // Classe de couleur Tailwind pour le dégradé de l'avatar
  gradientTo: string;
  quote: string;
  bio: string;
}

export interface OpportunityCol {
  id: string;
  title: string;
  iconName: string;
  items: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Olympiade' | 'Conférence' | 'Masterclass' | 'Salon' | 'Concours';
  ctaLabel: string;
}

export interface MissionData {
  text: string;
  objectives: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

// ==================== DONNÉES DU SITE ====================

// 1. Domaines (WhyMath — 6 items)
export const DOMAINS: DomainItem[] = [
  {
    id: "telecoms",
    title: "Télécommunications",
    description: "Optimisation de la couverture des réseaux mobiles 4G/5G, routage des paquets et théorie des files d'attente pour réduire la latence.",
    iconName: "Signal"
  },
  {
    id: "finance",
    title: "Finance & Banque",
    description: "Modélisation des marchés financiers, gestion des risques et calculs actuariels pour concevoir les assurances de demain.",
    iconName: "TrendingUp"
  },
  {
    id: "ia",
    title: "Intelligence Artificielle",
    description: "Algorithmes d'apprentissage automatique, réseaux de neurones profonds, traitement d'images et de données massives (Big Data).",
    iconName: "Brain"
  },
  {
    id: "energie",
    title: "Énergie & Environnement",
    description: "Modélisation mathématique du réseau électrique national (CIE) et simulation des flux de ressources pour optimiser la transition énergétique.",
    iconName: "Zap"
  },
  {
    id: "sante",
    title: "Santé Publique",
    description: "Modélisation épidémiologique pour anticiper la propagation des virus et analyses biostatistiques pour valider de nouveaux traitements.",
    iconName: "Activity"
  },
  {
    id: "btp",
    title: "Génie Civil & BTP",
    description: "Calcul de résistance des matériaux, modélisation des contraintes sur les ponts et structures, et topographie avancée.",
    iconName: "HardHat"
  }
];

// 2. Chiffres d'impact (RealLife — 4 items avec chiffres animés)
export const IMPACT_CARDS: ImpactCard[] = [
  {
    id: "engineers",
    numberValue: 2300,
    prefix: "+",
    label: "Ingénieurs formés par l'INP-HB depuis 1996.",
    iconName: "GraduationCap"
  },
  {
    id: "directors",
    numberValue: 67,
    suffix: "%",
    label: "des directeurs techniques des opérateurs télécoms ont une formation mathématique.",
    iconName: "Cpu"
  },
  {
    id: "funding",
    numberValue: 3.8,
    suffix: " Mds FCFA",
    decimals: 1,
    label: "d'investissements dans la recherche scientifique et l'innovation technologique en 2023.",
    iconName: "Award"
  },
  {
    id: "economy",
    numberValue: 4,
    suffix: "e",
    label: "meilleure économie d'Afrique subsaharienne, propulsée par le dynamisme de ses secteurs STEM.",
    iconName: "Globe"
  }
];

// 3. Portraits (6 profils inspirants — 3 hommes / 3 femmes)
export const PORTRAITS: PortraitItem[] = [
  {
    id: "konan-serge",
    name: "Dr. Konan Yao Serge",
    role: "Actuaire Senior",
    organization: "Allianz Côte d'Ivoire",
    gender: "H",
    badge: "Finance & Risques",
    initials: "KS",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
    quote: "L'actuariat est un pont de logique pure jeté sur un océan d'incertitudes financières.",
    bio: "Ancien major de l'ENSEA en 2012, il a poursuivi son parcours avec un doctorat en mathématiques financières. Il gère aujourd'hui les portefeuilles de risques complexes chez l'un des assureurs leaders à Abidjan."
  },
  {
    id: "toure-aminata",
    name: "Dr. Touré Aminata",
    role: "Épidémiologiste Biostatisticienne",
    organization: "OMS Bureau Régional Abidjan",
    gender: "F",
    badge: "Santé Publique",
    initials: "AT",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    quote: "Traduire la dynamique des maladies en équations permet de sauver des milliers de vies réelles.",
    bio: "Spécialiste de la modélisation des maladies infectieuses, elle conseille les autorités de santé publique ouest-africaines à l'aide de modèles mathématiques prédictifs performants."
  },
  {
    id: "diomande-adama",
    name: "Pr. Diomandé Adama",
    role: "Directeur de l'UFR Mathématiques",
    organization: "Université Félix Houphouët-Boigny",
    gender: "H",
    badge: "Recherche & Enseignement",
    initials: "DA",
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
    quote: "Les mathématiques ne sont pas seulement une science, c'est le langage universel de la pensée critique.",
    bio: "Auteur de nombreuses publications internationales sur les équations aux dérivées partielles, il forme la nouvelle génération de professeurs et de chercheurs ivoiriens."
  },
  {
    id: "bamba-carine",
    name: "Bamba Adjoua Carine",
    role: "Ingénieure Énergie Solaire",
    organization: "Compagnie Ivoirienne d'Électricité (CIE)",
    gender: "F",
    badge: "Énergie",
    initials: "BC",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-600",
    quote: "Optimiser le réseau électrique ivoirien exige des algorithmes aussi robustes que nos infrastructures.",
    bio: "Major de sa promotion à l'INP-HB de Yamoussoukro en 2017, elle pilote le dimensionnement et l'intégration des projets photovoltaïques de la CIE grâce à des modélisations de flux complexes."
  },
  {
    id: "coulibaly-lacina",
    name: "Coulibaly Lacina",
    role: "Lead Data Scientist",
    organization: "MTN Côte d'Ivoire",
    gender: "H",
    badge: "Intelligence Artificielle",
    initials: "LC",
    gradientFrom: "from-purple-600",
    gradientTo: "to-pink-600",
    quote: "La donnée brute n'est qu'un bruit. Les mathématiques la transforment en décisions stratégiques.",
    bio: "Fondateur de la startup DataKof et formateur, il conçoit les modèles prédictifs comportementaux utilisés pour anticiper et personnaliser l'expérience des millions d'abonnés de MTN en Côte d'Ivoire."
  },
  {
    id: "nguessan-christelle",
    name: "N'Guessan Christelle",
    role: "Professeure de Mathématiques",
    organization: "CAFOP Abidjan / Lauréate Nationale",
    gender: "F",
    badge: "Pédagogie d'Excellence",
    initials: "CN",
    gradientFrom: "from-teal-400",
    gradientTo: "to-cyan-600",
    quote: "Démystifier les mathématiques dès le premier âge est la clé pour libérer le génie scientifique ivoirien.",
    bio: "Lauréate du prix d'excellence de l'éducation nationale, elle forme les futurs enseignants à des méthodes pédagogiques interactives et visuelles favorisant l'amour des mathématiques."
  }
];

// 4. Opportunités & Parcours (3 colonnes)
export const OPPORTUNITIES: OpportunityCol[] = [
  {
    id: "careers",
    title: "Métiers d'Avenir",
    iconName: "Briefcase",
    items: [
      "Actuaire (Assurances & Banques)",
      "Data Scientist & Ingénieur IA",
      "Ingénieur Télécoms & Réseaux",
      "Analyste Financier & Quant",
      "Enseignant-Chercheur universitaire",
      "Ingénieur Concepteur de Structures (BTP)"
    ]
  },
  {
    id: "pathways",
    title: "Parcours d'Excellence",
    iconName: "Compass",
    items: [
      "Classes Préparatoires (CPGE) — Yamoussoukro",
      "Licence-Master UFR Maths (Cocody, Bouaké)",
      "DUT en Informatique et Statistique",
      "Grandes Écoles d'Ingénieurs Nationales",
      "Bourses d'Excellence du MESRS (Études à l'étranger)"
    ]
  },
  {
    id: "institutions",
    title: "Écoles & Concours",
    iconName: "Home",
    items: [
      "INP-HB (Institut National Polytechnique - Yamoussoukro)",
      "ENSEA (École Nationale Supérieure de Statistique - Abidjan)",
      "UFR MI (Université Félix Houphouët-Boigny)",
      "Concours CAFOP & Fonction Publique",
      "Olympiades Nationales de Mathématiques"
    ]
  }
];

// 5. Événements (Agenda — 6 items)
export const EVENTS: EventItem[] = [
  {
    id: "olympiades-2025",
    title: "Olympiades Nationales de Mathématiques 2025",
    date: "15 Février 2025",
    location: "Abidjan, Lycée Sainte-Marie",
    type: "Olympiade",
    ctaLabel: "S'inscrire"
  },
  {
    id: "portes-ouvertes-inphb",
    title: "Journée Portes Ouvertes INP-HB",
    date: "08 Mars 2025",
    location: "Yamoussoukro, Campus INP-HB",
    type: "Salon",
    ctaLabel: "Voir le programme"
  },
  {
    id: "conf-maths-ia",
    title: "Conférence : Mathématiques & IA en Afrique",
    date: "22 Avril 2025",
    location: "Abidjan, Palais des Congrès",
    type: "Conférence",
    ctaLabel: "Réserver son badge"
  },
  {
    id: "masterclass-actuaire",
    title: "Masterclass : Devenir Actuaire en Côte d'Ivoire",
    date: "10 Mai 2025",
    location: "En ligne (Zoom)",
    type: "Masterclass",
    ctaLabel: "Rejoindre le webinaire"
  },
  {
    id: "salon-grandes-ecoles",
    title: "Salon des Grandes Écoles de CI",
    date: "07 Juin 2025",
    location: "Abidjan, Sofitel Hôtel Ivoire",
    type: "Salon",
    ctaLabel: "Obtenir mon ticket"
  },
  {
    id: "concours-ensea",
    title: "Concours national d'entrée à l'ENSEA 2025",
    date: "20 Juin 2025",
    location: "Abidjan, Campus ENSEA",
    type: "Concours",
    ctaLabel: "Télécharger le dossier"
  }
];

// 6. Mission & Objectifs (Mission — texte & 3 objectifs)
export const MISSION: MissionData = {
  text: "Faire des mathématiques le levier de la génération qui construira la Côte d'Ivoire de 2050.",
  objectives: [
    {
      title: "Inspirer la jeunesse",
      description: "Montrer des modèles locaux de réussite pour susciter des vocations scientifiques dès le plus jeune âge.",
      iconName: "Sparkles"
    },
    {
      title: "Connecter l'écosystème",
      description: "Créer des ponts solides entre les étudiants, les institutions académiques et le monde de l'entreprise.",
      iconName: "Link"
    },
    {
      title: "Valoriser l'excellence",
      description: "Mettre en avant les filières d'excellence et les opportunités professionnelles à forte valeur ajoutée en Côte d'Ivoire.",
      iconName: "Award"
    }
  ]
};
