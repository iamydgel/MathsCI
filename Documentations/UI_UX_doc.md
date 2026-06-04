# Documentation UI/UX — MathSci CI 🇨🇮

Ce document sert de source unique de vérité visuelle pour le développement de ce site web vitrine. Il définit le Design System et les règles d'intégration esthétiques et interactives.

## 🎨 Philosophie de Design

Le design de **MathSci CI** est inspiré des codes visuels de Stripe (haut de page fluide et coloré, esthétique minimaliste mais très premium, typographies denses et épurées) tout en étant chaleureusement adapté aux couleurs nationales de la Côte d'Ivoire.
L'objectif est d'inspirer la confiance et le dynamisme à travers des animations fluides (GSAP) et une interface épurée.

## 📐 Guide de Style Visuel

### 1. Palette de Couleurs

Toutes les couleurs sont définies sous forme de variables CSS dans le thème Tailwind CSS v4.

#### Couleurs de Marque (Côte d'Ivoire)
* **Orange National (`--color-ci-orange`)** : `#FF7A00` — Couleur principale de marque, réservée aux boutons d'appel à l'action (CTA) primaires et aux éléments de focalisation forts.
* **Orange Soft (`--color-ci-orange-soft`)** : `#FF9A3C` — Utilisé pour les états de survol (hover) des CTA orange et certains badges.
* **Vert National (`--color-ci-green`)** : `#006B40` — Couleur secondaire premium. Utilisée pour les titres colorés, les liens et les accents.
* **Vert Clair (`--color-ci-green-light`)** : `#E8F5EE` — Fond léger pour les badges ou les petites alertes positives.

#### Surfaces & Fonds
* **Blanc Pur (`--color-white`)** : `#FFFFFF` — Utilisé pour le fond des cartes (cards) et les conteneurs détachés.
* **Crème (`--color-ci-cream`)** : `#F8F7F4` — Couleur de fond par défaut des sections impaires (Hero, WhyMath, StickyCardScroll, Portraits).
* **Sable (`--color-ci-sand`)** : `#F0EDE6` — Couleur de fond alternée des sections paires (RealLife, Opportunities, Agenda) pour créer un rythme de lecture.
* **Sombre/Charbon (`--color-ci-dark`)** : `#1A1A1A` — Fond de la section Mission pour un impact fort en fin de page, et couleur par défaut des textes principaux.

#### Nuances Neutres
* **Gris Texte (`--color-ci-gray`)** : `#6B7280` — Texte secondaire, paragraphes secondaires, légendes de tableaux.
* **Bordure Fine (`--color-ci-hairline`)** : `#E5E7EB` — Bordures légères de 1px sur les cartes.

---

### 2. Typographie

Nous utilisons trois familles de polices (Google Fonts) chargées via `next/font/google` :

* **Poppins (Titres & Titres Display)** : Une police géométrique et élégante. Elle apporte le côté éditorial et premium.
  * Utilisée pour les display headlines (`h1`, `h2`) avec une graisse fine (300/400) et un espacement de lettres légèrement resserré (`letter-spacing: -0.02em`).
* **Inter (Corps de texte & UI)** : La référence pour la lisibilité sur écran.
  * Utilisée pour les paragraphes, boutons et textes d'interface.
* **Space Grotesk (Chiffres & Accents)** : Une police technique et moderne.
  * Utilisée spécifiquement pour les chiffres animés, les dates, les données numériques (utilisation de la propriété `tabular-nums` pour un alignement parfait).

---

## ⚙️ Jetons de Design (Tokens CSS)

Déclarés dans [src/app/globals.css](file:///c:/Users/emsjo/Documents/VETERENT/WEB/train/src/app/globals.css) sous la directive `@theme` de Tailwind v4 :

```css
@import "tailwindcss";

@theme {
  /* Couleurs */
  --color-ci-orange: #FF7A00;
  --color-ci-orange-soft: #FF9A3C;
  --color-ci-green: #006B40;
  --color-ci-green-light: #E8F5EE;
  --color-ci-cream: #F8F7F4;
  --color-ci-sand: #F0EDE6;
  --color-ci-dark: #1A1A1A;
  --color-ci-gray: #6B7280;

  /* Polices */
  --font-poppins: 'Poppins', sans-serif;
  --font-inter: 'Inter', sans-serif;
  --font-space-grotesk: 'Space Grotesk', sans-serif;

  /* Rayons de bordure */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;
}
```

---

## 📦 Spécifications des Composants

### Boutons (`Button`)
* **Primary (Orange)** :
  * Style : Fond `--color-ci-orange`, texte blanc, forme pill (`rounded-full`), transition douce de la couleur de fond au survol vers `--color-ci-orange-soft`.
* **Outline (Vert)** :
  * Style : Fond transparent, bordure 1px `--color-ci-green`, texte `--color-ci-green`, forme pill. Au survol, fond `--color-ci-green-light` avec transition rapide.
* **Ghost (Gris)** :
  * Style : Pas de fond ni de bordure, texte `--color-ci-gray`. Au survol, texte `--color-ci-dark`.

### Cartes (`Card`)
* Fond blanc uni (`#FFFFFF`), rayon de courbure `rounded-lg` (12px), bordure fine de 1px en `#E5E7EB` pour détacher les éléments sur le fond Crème ou Sable.
* Élévation : Pas d'ombre portée lourde. Ombre très fine au repos, légère élévation au survol avec translation verticale (`y: -4px`) via GSAP ou CSS transition.

---

## ✨ Micro-animations Interactives & GSAP

Toutes les animations sont gérées via **GSAP** avec le hook `@gsap/react` pour une intégration propre.

### 1. Parallaxe & Gradients (Hero)
* Le fond décoratif (mesh gradient) en haut de page glisse légèrement au défilement (`ScrollTrigger` avec `scrub: 1`).
* Les titres et les boutons du Hero apparaissent avec un glissement vertical (`y: 30` vers `y: 0`) et une opacité progressive.

### 2. Compteurs Dynamiques (Section RealLife)
* Les chiffres d'impact clés ivoiriens s'incrémentent de `0` à leur valeur finale dès que la section entre dans le viewport.
* Utilisation du plug-in GSAP `ScrollTrigger` pour déclencher l'animation une seule fois (`toggleActions: "play none none none"`).

### 3. Défilement Fixe à Cartes (Sticky Card Scroll)
* Effet phare du site : La partie gauche reste figée au centre de l'écran pendant que les 4 chapitres de droite (Lycéen, Étudiant, Professionnel, Chercheur) défilent et s'activent l'un après l'autre.
* Transition de l'opacité et de la mise au point sur le chapitre actif.

---

## ♿ Accessibilité (WCAG 2.1 AA)

* **Contraste des Couleurs** : Le texte sombre sur fond Crème/Sable doit respecter un ratio d'au moins `4.5:1`. Le texte blanc sur fond Orange et Vert respecte également cette contrainte.
* **Réduction de mouvement (`prefers-reduced-motion`)** :
  * Toutes les animations GSAP complexes (le scroll sticky et les parallaxes) doivent être désactivées ou simplifiées si l'utilisateur a configuré son système d'exploitation pour réduire les mouvements.
* **Navigation Clavier** : Tous les éléments interactifs (liens du Header, boutons d'action) doivent posséder un indicateur de focus bien visible.
