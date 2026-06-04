'use client';

import React, { useRef } from 'react';
import { Signal, TrendingUp, Brain, Zap, Activity, HardHat } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import RadialOrbitalTimeline, { TimelineItem } from '../ui/radial-orbital-timeline';
import { gsap, useGSAP } from '@/lib/gsap';

export const WhyMath: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: "Télécommunications",
      date: "Réseau & Files d'attente",
      content: "Optimisation de la couverture des réseaux mobiles 4G/5G, routage des paquets et théorie des files d'attente pour réduire la latence.",
      category: "Télécoms",
      icon: Signal,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95
    },
    {
      id: 2,
      title: "Finance & Banque",
      date: "Calcul Actuariel & Risques",
      content: "Modélisation des marchés financiers, gestion des risques et calculs actuariels pour concevoir les assurances de demain.",
      category: "Finance",
      icon: TrendingUp,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 90
    },
    {
      id: 3,
      title: "Intelligence Artificielle",
      date: "Machine Learning & Big Data",
      content: "Algorithmes d'apprentissage automatique, réseaux de neurones profonds, traitement d'images et de données massives (Big Data).",
      category: "Data Science",
      icon: Brain,
      relatedIds: [1, 2, 4, 5],
      status: "in-progress" as const,
      energy: 98
    },
    {
      id: 4,
      title: "Énergie",
      date: "Modélisation CIE",
      content: "Modélisation mathématique du réseau électrique national (CIE) et simulation des flux de ressources pour optimiser la transition énergétique.",
      category: "Énergie",
      icon: Zap,
      relatedIds: [3, 6],
      status: "in-progress" as const,
      energy: 85
    },
    {
      id: 5,
      title: "Santé Publique",
      date: "Épidémiologie & Biostats",
      content: "Modélisation épidémiologique pour anticiper la propagation des virus et analyses biostatistiques pour valider de nouveaux traitements.",
      category: "Santé",
      icon: Activity,
      relatedIds: [3],
      status: "completed" as const,
      energy: 88
    },
    {
      id: 6,
      title: "BTP & Génie Civil",
      date: "Contraintes & Structures",
      content: "Calcul de résistance des matériaux, modélisation des contraintes sur les ponts et structures, et topographie avancée.",
      category: "Infrastructure",
      icon: HardHat,
      relatedIds: [4],
      status: "completed" as const,
      energy: 80
    }
  ];

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo('.orbital-wrapper',
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="why-math"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-cream border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8 max-w-2xl mx-auto">
          <SectionLabel color="orange">Pourquoi les Mathématiques ?</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les fondations de la <span className="font-semibold text-ci-green">transformation nationale</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Découvrez l'interconnectivité de nos domaines clés. Cliquez sur un pôle pour explorer son impact, ses technologies et ses connexions directes avec les autres secteurs.
          </p>
        </div>

        {/* Orbit Timeline Wrapper */}
        <div className="orbital-wrapper w-full flex justify-center items-center">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  );
};
