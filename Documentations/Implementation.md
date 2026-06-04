# Plan d'Implémentation — MathSci CI 🇨🇮

> Document vivant — mettre à jour à chaque tâche complétée.

---

## Vue d'Ensemble du Projet

**MathSci CI** est un site vitrine one-page premium promouvant les mathématiques en Côte d'Ivoire. Il est entièrement statique (aucun backend), développé avec Next.js 15 App Router, TypeScript, Tailwind CSS v4 et GSAP 3.12+.

**Référence Design :** Stripe-Inspired (adapté aux couleurs ivoiriennes — voir [DESIGN.md](file:///c:/Users/emsjo/Documents/VETERENT/WEB/train/DESIGN.md))

---

## Phase 1 : Fondations & Setup

> Objectif : Créer un projet Next.js 15 fonctionnel avec toutes les dépendances installées.

### 1.1 Initialisation du Projet

- [x] Initialiser le projet : `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] Vérifier la version de Next.js (`^15.x`) dans `package.json`
- [x] Installer GSAP et le hook React officiel : `npm install gsap @gsap/react`
- [x] Installer Lucide React : `npm install lucide-react`
- [x] Vérifier la version Tailwind CSS (`^4.x`) dans `package.json`

### 1.2 Configuration de Tailwind CSS v4

- [x] Dans `src/app/globals.css`, configurer les tokens personnalisés avec `@theme { ... }` :
  ```css
  @import "tailwindcss";
  @theme {
    --color-ci-orange: #FF7A00;
    --color-ci-orange-soft: #FF9A3C;
    --color-ci-green: #006B40;
    --color-ci-green-light: #E8F5EE;
    --color-ci-cream: #F8F7F4;
    --color-ci-sand: #F0EDE6;
    --color-ci-dark: #1A1A1A;
    --color-ci-gray: #6B7280;
    --font-poppins: 'Poppins', sans-serif;
    --font-inter: 'Inter', sans-serif;
    --font-space-grotesk: 'Space Grotesk', sans-serif;
  }
  ```
- [x] Configurer les styles de base (`body { font-family: var(--font-inter); color: #1A1A1A; background: #F8F7F4; }`)

### 1.3 Configuration des Polices Google (Next.js `next/font`)

- [x] Dans `src/app/layout.tsx`, importer et configurer Poppins, Inter et Space Grotesk via `next/font/google`
- [x] Appliquer les variables de police (`--font-poppins`, `--font-inter`, `--font-space-grotesk`) sur `<html>`

### 1.4 Registre GSAP Centralisé

- [x] Créer `src/lib/gsap.ts` avec :
  ```ts
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { useGSAP } from '@gsap/react';
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  export { gsap, ScrollTrigger, useGSAP };
  ```

### 1.5 SEO & Métadonnées Globales

- [x] Dans `src/app/layout.tsx`, configurer `export const metadata` : titre, description, og:image, lang="fr"
- [x] Configurer le viewport responsive dans les métadonnées

---

## Phase 2 : Données Statiques & Composants UI de Base

> Objectif : Créer le socle de données hardcodées et les composants atomiques réutilisables.

### 2.1 Données Statiques (Constants)

- [x] Créer `src/lib/constants/content.ts` avec les exports suivants :

  **Domaines (WhyMath — 6 items) :**
  - `Télécommunications` (optimisation des réseaux 4G/5G)
  - `Finance & Banque` (modèles actuariels, analyse de risques)
  - `Intelligence Artificielle` (machine learning, data science)
  - `Énergie & Environnement` (modélisation du réseau électrique CIE)
  - `Santé Publique` (modèles épidémiologiques, biostatistiques)
  - `Génie Civil & BTP` (calcul de structures, topographie)

  **RealLife Cards (4 items avec chiffres animés) :**
  - `+2 300 ingénieurs` formés par l'INP-HB depuis 1996
  - `67 %` des directeurs techniques des opérateurs télécoms ont une formation mathématique
  - `3,8 milliards FCFA` d'investissements dans la recherche scientifique en 2023
  - `4 e` meilleure économie d'Afrique subsaharienne portée par les STEM

  **Portraits (6 profils inspirants) :**
  - Homme 1 : `Dr. Konan Yao Serge` — Actuaire chez Allianz CI, ancien major ENSEA 2012
  - Homme 2 : `Pr. Diomandé Adama` — Mathématicien, directeur de l'UFR Mathématiques Université FHB
  - Homme 3 : `Coulibaly Lacina` — Data Scientist chez MTN CI, fondateur de la startup DataKof
  - Femme 1 : `Dr. Touré Aminata` — Épidémiologiste biostatisticienne, OMS Abidjan
  - Femme 2 : `Bamba Adjoua Carine` — Ingénieure énergie solaire à CIE, major INP-HB Promo 2017
  - Femme 3 : `N'Guessan Christelle` — Professeure agrégée de mathématiques, CAFOP lauréate

  **Opportunités :**
  - `Métiers` : Actuaire, Data Scientist, Ingénieur Télécoms, Analyste financier, Enseignant-chercheur, Ingénieur BTP
  - `Parcours` : CPGE (Lycée Sainte-Marie), Licence-Master UFR Maths (Cocody, Bouaké), DUT, Grandes Écoles
  - `Écoles & Concours` : INP-HB (Yamoussoukro), ENSEA (Abidjan), UFHB, Concours Fonction Publique, CAFOP, Bourse d'Excellence MESRS

  **Agenda Événements (6 items) :**
  - `Olympiades Nationales de Mathématiques 2025` — Abidjan, Lycée Sainte-Marie, 15 Février 2025
  - `Journée Portes Ouvertes INP-HB` — Yamoussoukro, 8 Mars 2025
  - `Conférence : Maths & IA en Afrique` — Abidjan, Palais des Congrès, 22 Avril 2025
  - `Masterclass : Devenir Actuaire en CI` — En ligne (Zoom), 10 Mai 2025
  - `Salon des Grandes Écoles de CI` — Abidjan, Sofitel, 7 Juin 2025
  - `Concours d'entrée ENSEA 2025` — ENSEA Abidjan, 20 Juin 2025

  **Mission (texte & 3 objectifs) :**
  - Mission : "Faire des mathématiques le levier de la génération qui construira la Côte d'Ivoire de 2050."
  - Objectif 1 : Inspirer 10 000 jeunes par an via des modèles ivoiriens
  - Objectif 2 : Connecter élèves, étudiants, et acteurs de l'écosystème STEM
  - Objectif 3 : Valoriser chaque filière scientifique comme un chemin d'excellence

### 2.2 Composants UI Atomiques

- [x] Créer `src/components/ui/Button.tsx` (variants : `primary` orange, `outline` vert, `ghost`)
- [x] Créer `src/components/ui/Badge.tsx` (variants : `orange`, `green`, `dark`)
- [x] Créer `src/components/ui/Card.tsx` (wrapper générique avec hover micro-animation)
- [x] Créer `src/components/ui/SectionLabel.tsx` (eyebrow label coloré)

### 2.3 Header & Footer

- [x] Créer `src/components/layout/Header.tsx` :
  - Navigation sticky avec `backdrop-blur` au scroll
  - Logo "MathSci CI" avec accent couleur `ci-green`
  - Liens d'ancres vers chaque section
  - Bouton CTA "Nous rejoindre" en `ci-orange`
  - Menu hamburger responsive (mobile)

- [x] Créer `src/components/layout/Footer.tsx` :
  - 4 colonnes : À propos / Navigation / Ressources / Réseaux sociaux
  - Copyright + email de contact
  - Fond `ci-dark` avec texte blanc

---

## Phase 3 : Intégration des Sections & Animations GSAP

> Objectif : Implémenter les 8 sections de la one-page avec leurs animations GSAP.

> ⚠️ **Rappel :** Tous les composants de cette phase sont `'use client'` et utilisent `useGSAP` de `@gsap/react`.

### 3.1 Section Hero (`src/components/sections/Hero.tsx`)

- [ ] Titre impactant avec mise en valeur typographique bi-couleur
- [ ] Sous-titre + double CTA (Découvrir les métiers / Voir les portraits)
- [ ] Illustration SVG abstraite mathématique (formules, graphes, symboles)
- [ ] Animation GSAP : `gsap.from('.hero-title', { y: 60, autoAlpha: 0, ... })`
- [ ] Animation GSAP : fade-in + slide-up sur le sous-titre (delay 0.3s)
- [ ] Parallax léger sur l'illustration SVG au scroll (`scrub: 1`)
- [ ] Fond `ci-cream`, gradient mesh décoratif Stripe-inspired (SVG inline)

### 3.2 Section WhyMath (`src/components/sections/WhyMath.tsx`)

- [ ] Titre de section + grille de 6 cards de domaines (icônes Lucide)
- [ ] Chaque card : icône Lucide colorée, titre domaine, courte description 2 lignes
- [ ] Animation GSAP ScrollTrigger : `stagger` 0.12s en entrée de viewport
- [ ] Hover micro-animation sur chaque card (`scale: 1.03`, `shadow-md`)
- [ ] Fond `ci-cream`, grille responsive 1→2→3 colonnes

### 3.3 Section RealLife (`src/components/sections/RealLife.tsx`)

- [ ] 4 cards avec chiffres impactants et description contextuelle ivoirienne
- [ ] Compteurs animés GSAP (`gsap.to(counter, { innerText: target, ... snap: 1 })`) au ScrollTrigger
- [ ] Icône illustrative sur chaque card
- [ ] Fond `ci-sand`, grille 1→2→4 colonnes
- [ ] Hover effect : bordure `ci-orange` en bas de chaque card

### 3.4 Section StickyCardScroll (`src/components/sections/StickyCardScroll.tsx`)

> Animation GSAP phare du site — section la plus complexe.

- [ ] Structure : une carte "pined" à gauche, 4 chapitres qui défilent sur la droite
- [ ] `ScrollTrigger.create({ pin: containerRef.current, scrub: true, ... })`
- [ ] 4 chapitres thématiques : "Le Lycéen", "L'Étudiant", "Le Professionnel", "Le Chercheur"
- [ ] Chaque chapitre avec illustration SVG / icône, titre, description (contexte ivoirien)
- [ ] Transition douce entre chapitres (opacity + translateY)
- [ ] Fond `ci-cream`

### 3.5 Section Portraits (`src/components/sections/Portraits.tsx`)

- [ ] Grille de 6 profils inspirants (3H/3F)
- [ ] Chaque portrait : avatar (initiales stylisées + dégradé), nom, rôle, badge domaine, citation inspirante
- [ ] Animation GSAP ScrollTrigger : stagger à l'entrée
- [ ] Hover : élévation de la card, affichage complet de la citation
- [ ] Fond `ci-cream`

### 3.6 Section Opportunities (`src/components/sections/Opportunities.tsx`)

- [ ] 3 colonnes : Métiers / Parcours / Écoles & Concours
- [ ] Chaque colonne avec icon, titre et liste structurée
- [ ] Animation ScrollTrigger : slide-up en stagger par colonne
- [ ] Fond `ci-sand`

### 3.7 Section Agenda (`src/components/sections/Agenda.tsx`)

- [ ] 6 événements en liste ou grille avec : date, lieu, type (badge coloré), titre, CTA "En savoir plus"
- [ ] Badge type : `Olympiade`, `Conférence`, `Masterclass`, `Salon`, `Concours`
- [ ] Animation ScrollTrigger : fade-in stagger par événement
- [ ] Fond `ci-cream`

### 3.8 Section Mission (`src/components/sections/Mission.tsx`)

- [ ] Texte de mission fort centré (large, typo Poppins 600)
- [ ] 3 objectifs clés en icônes + texte (grille 1→3)
- [ ] Email de contact + liens réseaux sociaux
- [ ] Animation GSAP : entrée dramatique en fade-in sur le texte de mission
- [ ] Fond `ci-dark` (#1A1A1A) — impact fort avant le Footer

---

## Phase 4 : Finitions, Accessibilité & Qualité

> Objectif : Polir l'expérience utilisateur et garantir accessibilité et performance.

### 4.1 Smooth Scroll & Navigation

- [ ] Activer `scroll-behavior: smooth` en CSS global
- [ ] Vérifier que tous les liens du Header pointent vers les bons ancres `#hero`, `#why-math`, etc.
- [ ] Tester la navigation entre sections sur mobile et desktop

### 4.2 Accessibilité

- [ ] Implémenter `prefers-reduced-motion` : désactiver les animations GSAP si l'utilisateur le préfère
  ```ts
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) { /* animations GSAP */ }
  ```
- [ ] Vérifier le contraste des couleurs (WCAG AA minimum)
- [ ] S'assurer que tous les boutons et liens sont navigables au clavier
- [ ] Ajouter les attributs `aria-label` sur les icônes sans texte

### 4.3 Performance & SEO

- [ ] Vérifier le Lighthouse Score (objectif : Performance ≥ 90, Accessibility ≥ 95)
- [ ] Optimiser le chargement des fonts (`display: swap`)
- [ ] Ajouter les métadonnées OG (Open Graph) pour le partage social
- [ ] Vérifier que `<h1>` est unique par page et que la hiérarchie H1→H6 est respectée

### 4.4 Tests Responsive

- [ ] Tester sur mobile 375px (iPhone SE)
- [ ] Tester sur tablet 768px (iPad)
- [ ] Tester sur desktop 1280px et 1440px
- [ ] Vérifier la StickyCardScroll sur mobile (simplification si nécessaire)
