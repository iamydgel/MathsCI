# Workflow de l'Agent de Développement — MathSci CI 🇨🇮

## Directive Principale

Vous êtes l'agent de développement du projet **MathSci CI**. Vous implémentez le site vitrine one-page de promotion des mathématiques en Côte d'Ivoire. Suivez toujours la documentation établie et maintenez la cohérence entre les fichiers.

---

## Processus de Travail Principal

### Avant de Démarrer Toute Tâche

1. Consulter `Documentations/Implementation.md` pour identifier la phase et la tâche en cours.
2. Vérifier les dépendances et les prérequis de la tâche.
3. Valider la portée de la modification avant toute action.

---

## Protocole d'Exécution par Tâche

### 1. Évaluation de la Tâche
- Lire la sous-tâche dans `Documentations/Implementation.md`.
- **Tâche simple** → Implémenter directement.
- **Tâche complexe** (composant GSAP, StickyCardScroll, etc.) → Créer une checklist de travail d'abord.

### 2. Règles d'Implémentation UI (Critiques)

Consulter `Documentations/UI_UX_doc.md` **avant toute création ou modification** d'un composant.

#### Palette de couleurs (tokens Tailwind v4 définis dans `src/app/globals.css`) :
| Token CSS           | Valeur    | Rôle                                      |
|---------------------|-----------|-------------------------------------------|
| `--ci-orange`       | `#FF7A00` | CTA primaires, accents forts              |
| `--ci-orange-soft`  | `#FF9A3C` | Hover, badges                             |
| `--ci-green`        | `#006B40` | Accent premium, titres colorés            |
| `--ci-green-light`  | `#E8F5EE` | Surfaces vertes, badges                   |
| `--ci-cream`        | `#F8F7F4` | Fond principal (sections impaires)        |
| `--ci-sand`         | `#F0EDE6` | Fond alterné (sections paires)            |
| `--ci-dark`         | `#1A1A1A` | Texte principal, section Mission          |
| `--ci-gray`         | `#6B7280` | Texte secondaire, placeholders            |

#### Rythme des fonds de sections :
- Hero, WhyMath, StickyCardScroll, Portraits → `bg-ci-cream`
- RealLife, Opportunities → `bg-ci-sand`
- Mission → `bg-ci-dark` (section sombre à fort impact)

#### Règles GSAP Obligatoires :
- Tous les composants avec GSAP **doivent** commencer par `'use client'`.
- Utiliser **`useGSAP`** de `@gsap/react` (jamais `useEffect` brut pour GSAP).
- Fournir toujours un `scope` ref à `useGSAP` pour éviter les fuites.
- `gsap.registerPlugin(ScrollTrigger, useGSAP)` est centralisé dans `src/lib/gsap.ts` — **ne jamais le dupliquer**.
- Encapsuler les gestionnaires d'événements créant des animations dans `contextSafe()`.

#### Conventions de Nommage :
- Composants React : `PascalCase` (ex. `HeroSection.tsx`)
- Constantes & données : `camelCase` (ex. `portraits.ts`)
- Fichiers CSS/Styles : `kebab-case` (ex. `globals.css`)

### 3. Structure des Fichiers — Vérification Avant Création
Consulter `Documentations/Project_structure.md` avant de :
- Exécuter des commandes shell.
- Créer de nouveaux fichiers ou dossiers.
- Installer de nouvelles dépendances.

### 4. Gestion des Erreurs
- Consulter `Documentations/bugs_tracking.md` pour chercher si un problème similaire a déjà été rencontré.
- Documenter **systématiquement** les nouvelles erreurs et leurs solutions dans `Documentations/bugs_tracking.md`.

### 5. Validation de la Tâche
Marquer une tâche comme complète `[x]` uniquement lorsque :
- La fonctionnalité est implémentée correctement.
- L'animation GSAP est nettoyée (via `useGSAP`).
- Le composant est responsive (mobile-first : 1 col → 2 col → 3 col).
- L'UI correspond aux spécifications de `Documentations/UI_UX_doc.md`.
- Aucune erreur ou avertissement TypeScript ne subsiste.

---

## Priorité de Référence des Fichiers

| Priorité | Fichier | Usage |
|----------|---------|-------|
| 1 | `Documentations/bugs_tracking.md` | Vérifier les problèmes connus d'abord |
| 2 | `Documentations/Implementation.md` | Référence principale des tâches |
| 3 | `Documentations/Project_structure.md` | Guide structurel |
| 4 | `Documentations/UI_UX_doc.md` | Référence design & animations |

---

## Règles Absolues

- **NE JAMAIS** implémenter l'UI sans consulter `Documentations/UI_UX_doc.md`.
- **NE JAMAIS** utiliser `useEffect` brut pour les animations GSAP — utiliser `useGSAP` de `@gsap/react`.
- **NE JAMAIS** dupliquer `gsap.registerPlugin()` en dehors de `src/lib/gsap.ts`.
- **NE JAMAIS** ignorer la directive `'use client'` sur les composants GSAP.
- **NE JAMAIS** marquer une tâche complète sans vérification responsive.
- **TOUJOURS** documenter les erreurs et solutions rencontrées.
- **TOUJOURS** respecter le rythme des fonds de sections défini ci-dessus.
