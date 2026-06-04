# Structure du Projet — MathSci CI 🇨🇮

Ce document décrit l'arborescence du code et les conventions de nommage adoptées pour le développement de ce site web vitrine.

## 📁 Arborescence Globale

```text
mathsci-ci/
├── .agent/                             # Règles et configurations de l'agent Antigravity
│   └── rules/
│       ├── generate.md                 # Directives de génération et planification
│       └── workflow.md                 # Guide d'implémentation et de style
├── Documentations/                     # Spécifications et documentations de référence
│   ├── Implementation.md               # Plan de route détaillé par phases
│   ├── Project_structure.md            # Ce fichier (structure et conventions)
│   ├── UI_UX_doc.md                    # Spécifications de design, tokens et animations
│   └── bugs_tracking.md                # Suivi des anomalies et des solutions
├── public/                             # Fichiers statiques publics (images, icônes, polices)
├── src/                                # Code source principal du site
│   ├── app/                            # Pages et configurations Next.js 15 App Router
│   │   ├── layout.tsx                  # Layout global (polices, métadonnées, SEO)
│   │   ├── page.tsx                    # Page d'accueil unique (One-Page)
│   │   └── globals.css                 # Styles globaux et tokens Tailwind v4
│   ├── components/                     # Éléments d'interface utilisateur
│   │   ├── ui/                         # Composants atomiques (Button, Badge, Card, etc.)
│   │   ├── layout/                     # Éléments structurels (Header, Footer)
│   │   └── sections/                   # Les 8 sections thématiques de la One-Page
│   └── lib/                            # Logique, constantes et utilitaires
│       ├── gsap.ts                     # Registre centralisé et hooks de GSAP
│       └── constants/
│           └── content.ts              # Données et textes statiques du site
├── .gitignore                          # Fichiers exclus de Git
├── next.config.ts                      # Configuration de Next.js
├── package.json                        # Dépendances et scripts du site
├── tsconfig.json                       # Configuration de TypeScript
└── README.md                           # Fiche d'accueil du site
```

## 🏷️ Conventions de Nommage

Afin de maintenir une cohérence et une lisibilité parfaite du code, veuillez respecter les conventions suivantes :

* **Composants React** : `PascalCase` (ex: `Hero.tsx`, `StickyCardScroll.tsx`).
* **Dossiers & Fichiers de logique / Constantes** : `camelCase` (ex: `content.ts`, `gsap.ts`).
* **Feuilles de style / CSS** : `kebab-case` (ex: `globals.css`).
* **Variables d'environnement / Constantes globales** : `UPPER_SNAKE_CASE` (ex: `NEXT_PUBLIC_SITE_URL`).

## 🛠️ Commandes Utiles du Site

* **Installation des modules** : `npm install`
* **Lancement en mode développement local** : `npm run dev`
* **Vérification de la conformité (Linter)** : `npm run lint`
* **Compilation pour la production** : `npm run build`
* **Démarrage en mode production** : `npm run start`
