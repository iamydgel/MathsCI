'use client';

import React, { useRef } from 'react';
import { GraduationCap, Cpu, Award, Globe } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { BentoGrid, BentoItem } from '../ui/bento-grid';
import { gsap, useGSAP } from '@/lib/gsap';

const StatCounterRef: React.FC<{ value: number; decimals?: number; prefix?: string; suffix?: string }> = ({ 
  value, 
  decimals = 0,
  prefix,
  suffix
}) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (numberRef.current) numberRef.current.innerText = value.toString();
      return;
    }

    const valueObj = { val: 0 };
    gsap.to(valueObj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: numberRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = valueObj.val.toFixed(decimals);
        }
      }
    });
  }, { scope: numberRef });

  return (
    <span className="font-bold font-space-grotesk text-2xl md:text-3xl text-ci-dark select-none flex items-baseline">
      {prefix && <span className="text-ci-orange mr-1">{prefix}</span>}
      <span ref={numberRef}>0</span>
      {suffix && <span className="text-ci-green ml-0.5">{suffix}</span>}
    </span>
  );
};

export const RealLife: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const bentoItems: BentoItem[] = [
    {
      title: "Ingénieurs Spécialisés",
      description: "Hautement qualifiés et formés par l'INP-HB depuis 1996, constituant le moteur de la modernisation de nos infrastructures stratégiques.",
      icon: <GraduationCap className="w-4 h-4 text-ci-orange" />,
      status: "Formation d'Élite",
      tags: ["INP-HB", "STEM", "Polytechnique"],
      meta: "+2 300 diplômés",
      colSpan: 2,
      hasPersistentHover: true,
      cta: "Découvrir la formation"
    },
    {
      title: "Directeurs Techniques",
      description: "Une écrasante majorité des directeurs techniques des leaders des télécoms ivoiriens ont suivi un parcours rigoureux basé sur les mathématiques.",
      icon: <Cpu className="w-4 h-4 text-ci-green" />,
      status: "Acteurs Décideurs",
      tags: ["Télécoms", "MTN", "Orange", "Moov"],
      meta: "67% des postes",
      cta: "Voir les opportunités"
    },
    {
      title: "Financement & R&D",
      description: "Investissements historiques de l'État et des partenaires privés pour dynamiser la recherche appliquée et le transfert technologique.",
      icon: <Award className="w-4 h-4 text-amber-500" />,
      status: "Investissement",
      tags: ["R&D", "Abidjan", "Innovation"],
      meta: "3.8 Mds FCFA",
      cta: "Consulter les projets"
    },
    {
      title: "Compétitivité Régionale",
      description: "Positionnée comme la 4ème puissance économique d'Afrique subsaharienne, portée par un dynamisme numérique et industriel d'excellence.",
      icon: <Globe className="w-4 h-4 text-sky-500" />,
      status: "Positionnement",
      tags: ["PIB", "UEMOA", "Afrique de l'Ouest"],
      meta: "4ème Économie",
      colSpan: 2,
      cta: "Lire le rapport"
    }
  ];

  // Custom mapper to inject the animated numbers inside the titles dynamically
  const enrichedBentoItems = bentoItems.map((item, idx) => {
    let customTitleNode: React.ReactNode = item.title;
    
    if (idx === 0) {
      customTitleNode = (
        <span className="flex items-center gap-2">
          <StatCounterRef value={2300} prefix="+" />
          <span className="text-xs text-ci-gray font-normal">Ingénieurs formés</span>
        </span>
      );
    } else if (idx === 1) {
      customTitleNode = (
        <span className="flex items-center gap-2">
          <StatCounterRef value={67} suffix="%" />
          <span className="text-xs text-ci-gray font-normal">des CTOs</span>
        </span>
      );
    } else if (idx === 2) {
      customTitleNode = (
        <span className="flex items-center gap-2">
          <StatCounterRef value={3.8} decimals={1} suffix=" Mds FCFA" />
        </span>
      );
    } else if (idx === 3) {
      customTitleNode = (
        <span className="flex items-center gap-2">
          <StatCounterRef value={4} suffix="e" />
          <span className="text-xs text-ci-gray font-normal">Économie Subsaharienne</span>
        </span>
      );
    }

    return {
      ...item,
      title: customTitleNode
    };
  });

  return (
    <section
      id="real-life"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-cream border-y border-gray-200/45"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-2xl mx-auto">
          <SectionLabel color="green">Impact Réel & Chiffres</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les mathématiques en <span className="font-semibold text-ci-orange">actions concrètes</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Derrière les indicateurs de notre croissance économique et technologique se cachent des esprits brillants et des investissements structurants.
          </p>
        </div>

        {/* Stats Bento Grid */}
        <BentoGrid items={enrichedBentoItems} />
      </div>
    </section>
  );
};
