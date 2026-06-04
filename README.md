# MathSci CI 🇨🇮

Un site vitrine one-page premium destiné à promouvoir les mathématiques en Côte d'Ivoire auprès des collégiens, lycéens, étudiants et candidats aux concours.

## 🎯 Aperçu du Projet

**MathSci CI** vise à redorer le blason de la discipline mathématique en Côte d'Ivoire. Le site met en lumière :
- Les **débouchés concrets** dans l'écosystème ivoirien (Finance, Télécoms, Énergie, Intelligence Artificielle, etc.).
- Des **portraits inspirants** de mathématiciens et mathématiciennes locaux (3 femmes, 3 hommes) pour créer des vocations.
- Les **parcours d'excellence** et les écoles prestigieuses de la sous-région (INP-HB, ENSEA, CAFOP, etc.).
- Un **agenda des événements** et des concours scientifiques nationaux.

## 🚀 Guide de Démarrage Rapide

### Étape 1 : Installation des Dépendances
```bash
npm install
```

### Étape 2 : Lancement du Serveur de Développement
```bash
npm run dev
```
Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Étape 3 : Production Build (Compilation)
```bash
npm run build
npm run start
```

## 📁 Structure du Projet

Le projet suit une architecture modulaire et propre (inspirée du framework `CONTEXT_WORKFLOW`) :
```text
mathsci-ci/
├── .agent/                             # Règles personnalisées pour l'agent Antigravity
│   └── rules/
│       ├── generate.md                 # Règles de planification
│       └── workflow.md                 # Règles de flux de travail (implémentation)
├── Documentations/                     # Spécifications et documentation projet
│   ├── Implementation.md               # Plan d'implémentation par étapes
│   ├── Project_structure.md            # Description de l'arborescence et des conventions
│   ├── UI_UX_doc.md                    # Design System (couleurs, typographies, transitions)
│   └── bugs_tracking.md                # Suivi des anomalies et troubleshooting
├── src/
│   ├── app/                            # Dossier principal Next.js 15 App Router
│   ├── components/                     # Composants UI, Layout et Sections de la One-page
│   ├── lib/                            # Données statiques et utilitaires (dont GSAP)
│   └── styles/                         # Fichiers CSS globaux
└── README.md                           # Ce fichier
```

Pour plus d'informations détaillées, consultez la [Structure du Projet](file:///Documentations/Project_structure.md).

## 🛠️ Stack Technique

- **Framework :** Next.js 15 (App Router) + React 19 + TypeScript
- **Stylisation :** Tailwind CSS v4 (Design System ivoirien premiumisé en CSS)
- **Animations :** GSAP 3.12+ (ScrollTrigger + `@gsap/react` pour une gestion robuste du cycle de vie React)
- **Icônes :** Lucide React
- **Typographies :** Poppins (Titres), Inter (Corps), Space Grotesk (Chiffres & Accents)
