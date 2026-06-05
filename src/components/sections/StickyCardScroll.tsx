"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─── MagicText: animate words as they scroll into view ───────────────────────

const Word: React.FC<{
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mt-2 mr-2.5 inline-block font-inter text-lg md:text-2xl font-light text-ci-dark leading-relaxed">
      <span className="absolute opacity-20 text-ci-gray">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const MagicText: React.FC<{ text: string }> = ({ text }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={container}
      className="flex flex-wrap leading-relaxed py-2 max-w-2xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParcoursSectionProps {
  id: string;
  number: string;
  subtitle: string;
  title: string;
  badgeText: string;
  description: string;
  details: string[];
  mockupTitle: string;
  mockupCode: string;
  mockupMetric: { label: string; value: string };
  image: string;
  index: number;
}

// ─── Individual section with Framer Motion parallax ──────────────────────────

const ParcoursSection: React.FC<ParcoursSectionProps> = ({
  number,
  subtitle,
  title,
  badgeText,
  description,
  details,
  mockupTitle,
  mockupCode,
  mockupMetric,
  image,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.92, 1, 1, 0.92]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 md:py-32 border-b border-gray-100/60"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "md:grid-flow-dense" : ""
            }`}
        >
          {/* ── Text Column ── */}
          <motion.div
            style={{ y: textY }}
            className={`space-y-6 ${!isEven ? "md:col-start-2" : ""}`}
          >
            {/* Chapter Number */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-space-grotesk text-[80px] md:text-[120px] font-black text-gray-100 leading-none select-none"
            >
              {number}
            </motion.span>

            <div className="-mt-6 space-y-3">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border font-inter bg-ci-orange/10 text-ci-orange border-ci-orange/20">
                  {badgeText}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="font-poppins text-3xl md:text-5xl font-bold text-ci-dark tracking-tight"
              >
                {title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="font-poppins text-sm font-semibold text-ci-green"
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Magic animated description */}
            <MagicText text={description} />

            {/* Detail bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-2 pt-2"
            >
              {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-ci-gray font-light">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ci-orange" />
                  {detail}
                </li>
              ))}
            </motion.ul>

            {/* Metric pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-ci-green-light border border-ci-green/10 rounded-xl px-4 py-3"
            >
              <span className="text-xs text-ci-green font-medium">{mockupMetric.label}</span>
              <span className="font-space-grotesk font-bold text-sm text-ci-green">{mockupMetric.value}</span>
            </motion.div>
          </motion.div>

          {/* ── Image / Mockup Column ── */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className={`relative h-[380px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl ${!isEven ? "md:col-start-1 md:row-start-1" : ""
              }`}
          >
            {/* Real image */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ci-dark/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Main StorytellingScroll section ─────────────────────────────────────────

const chapters = [
  {
    id: "lyceen",
    number: "01",
    title: "Le Lycéen",
    subtitle: "L'Éveil des Vocations",
    badgeText: "Découverte & Olympiades",
    description: "Démystifier les mathématiques dès le premier âge et repérer les jeunes talents ivoiriens à travers des méthodes interactives.",
    details: [
      "Olympiades Nationales de Mathématiques au Lycée Sainte-Marie",
      "Clubs scientifiques et codage d'initiation au Scratch/Python",
      "Concours régionaux de promotion des disciplines STEM",
    ],
    mockupTitle: "Olympiades_Niveau_Lycée.py",
    mockupCode: `def evaluer_potentiel(eleve):\n    score_logique = eleve.resoudre_enigme()\n    score_passion = eleve.participation_club()\n    \n    if score_logique > 85 and score_passion > 70:\n        return "Profil STEM d'Excellence"\n    return "Curiosité à encourager"`,
    mockupMetric: { label: "Élèves inspirés / an", value: "10 000+" },
    image: "/lyceens.jpg",
  },
  {
    id: "etudiant",
    number: "02",
    title: "L'Étudiant",
    subtitle: "La Spécialisation d'Élite",
    badgeText: "Classes Préparatoires & Grandes Écoles",
    description: "Forger une expertise technique de niveau mondial au sein des fleurons universitaires nationaux et sous-régionaux.",
    details: [
      "Classes Préparatoires aux Grandes Écoles (CPGE) à l'INP-HB Yamoussoukro",
      "Cursus d'ingénieur statisticien-économiste d'élite à l'ENSEA Abidjan",
      "Licences et Masters recherche en mathématiques appliquées (UFR MI Cocody)",
    ],
    mockupTitle: "Calcul_Filiere_INPHB.rs",
    mockupCode: `fn calculer_admissibilite(candidat: &Etudiant) -> bool {\n    let moyenne_concours = candidat.note_maths * 0.6 + candidat.note_physique * 0.4;\n    let quota_excellence = 16.5;\n    \n    moyenne_concours >= quota_excellence\n}`,
    mockupMetric: { label: "Taux d'insertion", value: "98.5%" },
    image: "/etudiants.jpg",
  },
  {
    id: "professionnel",
    number: "03",
    title: "Le Professionnel",
    subtitle: "L'Impact Économique",
    badgeText: "Entreprises & Startups",
    description: "Traduire les compétences analytiques en valeur économique ajoutée pour les leaders des télécoms, de la finance et de l'énergie.",
    details: [
      "Actuariat et gestion des portefeuilles de risques chez Allianz CI",
      "Lead Data Science et valorisation prédictive des données chez MTN CI",
      "Modélisation et optimisation des flux d'énergie à la CIE",
    ],
    mockupTitle: "allianz_risques.sql",
    mockupCode: `SELECT \n  client_id,\n  LOGISTIC_REGRESSION(age, sinistres) AS score_actuariel,\n  SUM(cotisation_fcfa) AS capital_garanti\nFROM allianz_portefeuilles\nGROUP BY client_id\nHAVING score_actuariel < 0.15;`,
    mockupMetric: { label: "Salaires de sortie", value: "Excellents" },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop&crop=entropy&auto=format&q=80",
  },
  {
    id: "chercheur",
    number: "04",
    title: "Le Chercheur",
    subtitle: "L'Innovation de Rupture",
    badgeText: "Doctorat & Laboratoire",
    description: "Concevoir les théories et algorithmes fondamentaux de demain au sein de pôles de recherche de pointe.",
    details: [
      "Modélisation épidémiologique auprès de l'OMS Abidjan",
      "Recherche fondamentale en équations aux dérivées partielles (EDP)",
      "Algorithmes d'intelligence artificielle adaptés aux défis africains",
    ],
    mockupTitle: "oms_biostats_modele.py",
    mockupCode: `class ModeleEpidemique(SIRModel):\n    def simuler_propagation(self, taux_transmission):\n        S, I, R = self.etat_initial\n        d_S = -taux_transmission * S * I\n        d_I = (taux_transmission * S - self.guerison) * I\n        return [d_S, d_I]`,
    mockupMetric: { label: "Brevets & Papiers", value: "45 / an" },
    image: "/chercheurs.jpg",
  },
];

export const StickyCardScroll: React.FC = () => {
  return (
    <div id="sticky-scroll" className="bg-ci-cream">
      {/* ── Section Header (sticky hero intro) ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center py-24 border-b border-gray-100 overflow-hidden">
        {/* Subtle mesh gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-ci-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ci-green/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5"
          >
            <SectionLabel color="orange">Le Parcours de Réussite</SectionLabel>

            <h2 className="font-poppins text-3xl md:text-5xl font-light tracking-tight text-ci-dark leading-tight">
              De la salle de classe aux{" "}
              <span className="font-semibold text-ci-green">décisions stratégiques</span>
            </h2>

            <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light max-w-xl mx-auto">
              Découvrez le parcours complet reliant l'initiation scolaire à l'excellence académique, industrielle et scientifique nationale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story Chapters ── */}
      {chapters.map((chapter, index) => (
        <ParcoursSection
          key={chapter.id}
          id={chapter.id}
          number={chapter.number}
          subtitle={chapter.subtitle}
          title={chapter.title}
          badgeText={chapter.badgeText}
          description={chapter.description}
          details={chapter.details}
          mockupTitle={chapter.mockupTitle}
          mockupCode={chapter.mockupCode}
          mockupMetric={chapter.mockupMetric}
          image={chapter.image}
          index={index}
        />
      ))}
    </div>
  );
};
