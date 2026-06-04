'use client';

import React, { useRef } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { PORTRAITS } from '@/lib/constants/content';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export const Portraits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="portraits"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <SectionLabel color="green">Visages & Modèles</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les visages de l'<span className="font-semibold text-ci-orange">excellence mathématique</span> ivoirienne
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Rencontrez des femmes et des hommes qui traduisent chaque jour la logique pure en impacts majeurs pour le développement de notre nation.
          </p>
        </div>

        {/* Portraits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PORTRAITS.map((profile, idx) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <Card
                className="portrait-card flex flex-col justify-between hover:border-ci-green/30 group relative bg-white border border-gray-200/90 shadow-sm h-full"
              >
                <div className="space-y-6">
                  {/* Header Profile with Gradient Avatar */}
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-full bg-gradient-to-tr ${profile.gradientFrom} ${profile.gradientTo} flex items-center justify-center text-white font-space-grotesk text-lg font-bold shadow-md shrink-0 select-none group-hover:scale-105 transition-transform duration-300`}>
                      {profile.initials}
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-base md:text-lg text-ci-dark group-hover:text-ci-orange transition-colors duration-200">
                        {profile.name}
                      </h3>
                      <p className="font-inter text-xs text-ci-gray font-light">
                        {profile.role}
                      </p>
                      <p className="font-inter text-[10px] text-ci-green font-medium">
                        {profile.organization}
                      </p>
                    </div>
                  </div>

                  {/* Badge Category */}
                  <div className="flex">
                    <Badge variant={profile.gender === 'F' ? 'green' : 'orange'} className="text-[9px]">
                      {profile.badge}
                    </Badge>
                  </div>

                  {/* Interactive Quote section */}
                  <div className="relative pl-6 pt-2">
                    <Quote className="absolute left-0 top-0 h-5 w-5 text-gray-200/70 select-none" />
                    <p className="font-poppins italic text-xs md:text-sm text-ci-dark leading-relaxed font-light line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      "{profile.quote}"
                    </p>
                  </div>
                </div>

                {/* Bio snippet on footer */}
                <div className="border-t border-gray-100 pt-4 mt-6">
                  <p className="font-inter text-[11px] md:text-xs text-ci-gray leading-relaxed font-light">
                    {profile.bio}
                  </p>
                </div>

                {/* Decorative accent */}
                <div className="absolute bottom-0 right-0 h-1.5 w-12 rounded-tl-md bg-gradient-to-r from-transparent to-ci-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
