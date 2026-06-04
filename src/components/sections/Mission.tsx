'use client';

import React, { useRef } from 'react';
import { Sparkles, Link, Award, Mail } from 'lucide-react';
import { MISSION } from '@/lib/constants/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Link,
  Award,
};

export const Mission: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="mission"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-dark text-white relative overflow-hidden"
    >
      {/* Decorative dark vector grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dark-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-grid)" />
        </svg>
      </div>

      {/* Decorative colored glow on corners */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-ci-orange/10 filter blur-[80px]" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-ci-green/10 filter blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Large Mission Statement Header */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-20">
          <SectionLabel color="orange">Notre Engagement</SectionLabel>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mission-title font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl"
          >
            "Faire des mathématiques le{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ci-orange to-ci-orange-soft">
              levier d'excellence
            </span>{' '}
            de la génération qui construira la Côte d'Ivoire de 2050."
          </motion.h2>
          
          <div className="h-1 w-20 bg-ci-orange/40 rounded-full" />
        </div>

        {/* 3 Goals/Objectives Grid */}
        <div className="mission-grid-trigger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {MISSION.objectives.map((obj, index) => {
            const IconComp = iconMap[obj.iconName] || Sparkles;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  hoverEffect={true}
                  className="mission-objective-card bg-white/5 border border-white/10 p-8 flex flex-col gap-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-lg text-left h-full"
                >
                  <div className="h-10 w-10 rounded-lg bg-ci-orange/15 border border-ci-orange/20 flex items-center justify-center text-ci-orange">
                    <IconComp className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-poppins font-medium text-lg text-white">
                      {obj.title}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                      {obj.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA & Social Network Banner */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          
          {/* Contact Details */}
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-poppins font-medium text-sm text-ci-orange uppercase tracking-wider">
              Vous partagez notre vision ?
            </h4>
            <p className="font-inter text-sm text-gray-400 font-light">
              Rejoignez-nous en tant que partenaire, conférencier ou mécène.
            </p>
          </div>

          {/* Double interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto shrink-0">
            <a href="mailto:contact@mathsci.ci" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <Mail className="h-4.5 w-4.5" /> Nous Contacter
              </Button>
            </a>
            
            {/* Quick social links row */}
            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-2.5 px-4 rounded-pill select-none">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
