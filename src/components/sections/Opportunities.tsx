'use client';

import React from 'react';
import { Briefcase, Compass, GraduationCap, ArrowUpRight } from 'lucide-react';
import { OPPORTUNITIES, OpportunityCol } from '@/lib/constants/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase: Briefcase,
  Compass: Compass,
  Home: GraduationCap, // Map 'Home' icon to GraduationCap for better academic visual
};

const QUESTIONS_MARQUEE = [
  "Quel est le salaire d'un actuaire ?",
  "Comment devenir Data Scientist ?",
  "Quels sont les débouchés après l'INP-HB ?",
  "Pourquoi faire des CPGE à Yamoussoukro ?",
  "Quelles sont les opportunités à l'ENSEA Abidjan ?",
  "Puis-je faire de l'IA avec une licence de maths ?",
  "Qu'est-ce que la finance quantitative ?",
  "Quel est le rôle d'un ingénieur en modélisation ?",
  "Pourquoi le secteur de l'énergie recrute des matheux ?",
  "Comment préparer le concours de l'ENSEA ?",
  "Quelles bourses pour étudier les STEM à l'étranger ?",
  "Quels débouchés dans le BTP et génie civil ?",
];

function BadgesMarqueeRow({
  items,
  reverse = false,
  speed = 30,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  // Triple items for infinite loop seamless scroll
  const tripled = React.useMemo(() => [...items, ...items, ...items], [items]);
  return (
    <div className="relative w-full overflow-hidden py-1.5 isolation-isolate">
      {/* Edge gradients for smooth fade - reduced width to increase visibility */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 md:w-16 z-10 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent" />
      
      <div
        className="flex transform-gpu min-w-[300%] gap-3"
        style={{
          animation: `marqueeScrollOpp ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {tripled.map((item, idx) => (
          <Badge
            key={`${item}-${idx}`}
            variant="orange"
            className="rounded-full border-[#FDF2E9] bg-[#FDF2E9] px-4 py-2 text-ci-orange text-xs md:text-sm font-medium shrink-0 hover:bg-ci-orange/10 transition-colors whitespace-nowrap"
          >
            {item}
          </Badge>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 md:w-16 z-10 bg-gradient-to-l from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent" />
    </div>
  );
}

export const Opportunities: React.FC = () => {
  const m1 = QUESTIONS_MARQUEE.slice(0, 4);
  const m2 = QUESTIONS_MARQUEE.slice(4, 8);
  const m3 = QUESTIONS_MARQUEE.slice(8);

  return (
    <section
      id="opportunities"
      className="relative bg-[#FFFDF9] pt-20 pb-16 md:pt-28 md:pb-24 border-y border-gray-100 overflow-hidden"
    >
      <style>{`
        @keyframes marqueeScrollOpp {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
      `}</style>
      
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mb-8">
          <SectionLabel color="orange">Filières & Débouchés</SectionLabel>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ci-dark leading-tight">
            Les portes d'accès vers <span className="font-semibold text-ci-green">le succès d'avenir</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light max-w-2xl">
            Une boussole claire pour les élèves et les étudiants souhaitant s'orienter vers les carrières les plus stimulantes et recherchées en Côte d'Ivoire.
          </p>
        </div>

        {/* Marquee badging questions - Moved out of max-w-3xl for wider visibility and increased width to max-w-5xl */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden mb-12">
          <div className="flex flex-col gap-2 w-full">
            <BadgesMarqueeRow items={m1} reverse={false} speed={35} />
            <BadgesMarqueeRow items={m2} reverse={true} speed={40} />
            <BadgesMarqueeRow items={m3} reverse={false} speed={38} />
          </div>
        </div>


        {/* Dash-divided Grid Layout matching target design */}
        <div className="mt-16 grid grid-cols-1 divide-dashed divide-gray-200 border-gray-200 border-t border-dashed sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map((column: OpportunityCol) => {
            const IconComponent = iconMap[column.iconName] || Briefcase;
            return (
              <div
                className="flex flex-col gap-8 px-6 py-10 last:border-b-0 lg:border-b-0 group hover:bg-[#FFFBF4] transition-all duration-300 relative"
                key={column.id}
              >
                {/* Icon top */}
                <div className="h-12 w-12 rounded-xl bg-ci-orange/10 text-ci-orange flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Content body */}
                <div className="flex flex-col gap-4 pt-4 md:pt-8">
                  <h3 className="font-poppins font-medium text-2xl tracking-tight text-ci-dark group-hover:text-ci-orange transition-colors">
                    {column.title}
                  </h3>
                  
                  {/* Styled list of opportunities */}
                  <ul className="space-y-3.5 mt-2">
                    {column.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-ci-gray font-light leading-relaxed group/item"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-ci-green mt-2.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-ci-dark transition-colors duration-150">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn more link */}
                <div className="mt-auto pt-6 flex items-center text-xs font-semibold text-ci-green gap-1 group-hover:text-ci-orange transition-colors cursor-pointer">
                  <span>Explorer cette filière</span>
                  <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
