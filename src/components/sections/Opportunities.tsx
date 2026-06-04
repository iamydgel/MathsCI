'use client';

import React, { useRef } from 'react';
import { Briefcase, Compass, Home, ChevronRight } from 'lucide-react';
import { OPPORTUNITIES } from '@/lib/constants/content';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase,
  Compass,
  Home,
};

export const Opportunities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="opportunities"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-cream border-y border-gray-200/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <SectionLabel color="orange">Filières & Débouchés</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les portes d'accès vers <span className="font-semibold text-ci-green">le succès d'avenir</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Une boussole claire pour les élèves et les étudiants souhaitant s'orienter vers les carrières les plus stimulantes et recherchées.
          </p>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OPPORTUNITIES.map((column, idx) => {
            const IconComponent = iconMap[column.iconName] || Briefcase;
            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  className="opp-column-card border border-gray-200/90 shadow-sm flex flex-col justify-between h-full bg-white group hover:border-ci-orange/30 transition-all duration-300"
                >
                  <div className="space-y-6">
                    {/* Column Header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                      <div className="h-10 w-10 rounded-lg bg-ci-orange/10 flex items-center justify-center text-ci-orange group-hover:bg-ci-green/10 group-hover:text-ci-green transition-all duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-poppins text-lg font-semibold text-ci-dark">
                        {column.title}
                      </h3>
                    </div>

                    {/* Column Bullet List */}
                    <ul className="space-y-4">
                      {column.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs md:text-sm text-ci-gray font-light group/item leading-relaxed"
                        >
                          <span className="h-5 w-5 shrink-0 rounded-full bg-ci-green-light flex items-center justify-center text-ci-green mt-0.5 group-hover/item:bg-ci-orange/15 group-hover/item:text-ci-orange transition-all duration-200">
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                          <span className="group-hover/item:text-ci-dark transition-colors duration-150">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom decorative accent */}
                  <div className="mt-8 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-ci-green group-hover:text-ci-orange transition-colors">
                    <span>En savoir plus</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
