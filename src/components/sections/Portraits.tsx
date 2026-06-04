'use client';

import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import { PORTRAITS, PortraitItem } from '@/lib/constants/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';

// Unsplash images mapped to portrait IDs
const PORTRAIT_IMAGES: Record<string, string> = {
  'konan-serge': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80',
  'toure-aminata': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&q=80',
  'diomande-adama': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&q=80',
  'bamba-carine': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&q=80',
  'coulibaly-lacina': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&q=80',
  'nguessan-christelle': 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face&q=80',
};

const PortraitCard = ({ item }: { item: PortraitItem }) => {
  const imageUrl = PORTRAIT_IMAGES[item.id];

  return (
    <div className="p-6 rounded-2xl mx-4 shadow-sm hover:shadow-md transition-all duration-300 w-[380px] shrink-0 bg-white border border-gray-100 flex flex-col justify-between group relative overflow-hidden">
      <div className="space-y-4">
        {/* Header Profile */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {imageUrl ? (
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                src={imageUrl}
                alt={item.name}
              />
            ) : (
              <div className={`h-14 w-14 rounded-full bg-gradient-to-tr ${item.gradientFrom} ${item.gradientTo} flex items-center justify-center text-white font-space-grotesk text-lg font-bold shadow-md select-none group-hover:scale-105 transition-transform duration-300`}>
                {item.initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-ci-green fill-white" />
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-sm md:text-base text-ci-dark group-hover:text-ci-orange transition-colors duration-200 flex items-center gap-1.5">
              {item.name}
            </h3>
            <p className="font-inter text-xs text-ci-gray font-light line-clamp-1">
              {item.role}
            </p>
            <p className="font-inter text-[10px] text-ci-green font-semibold">
              {item.organization}
            </p>
          </div>
        </div>

        {/* Badge Category */}
        <div className="flex">
          <Badge variant={item.gender === 'F' ? 'green' : 'orange'} className="text-[9px]">
            {item.badge}
          </Badge>
        </div>

        {/* Interactive Quote section */}
        <div className="relative pl-6 pt-1">
          <Quote className="absolute left-0 top-0 h-4 w-4 text-gray-200/70 select-none rotate-180" />
          <p className="font-poppins italic text-xs md:text-sm text-ci-dark leading-relaxed font-light">
            "{item.quote}"
          </p>
        </div>
      </div>

      {/* Bio snippet on footer */}
      <div className="border-t border-gray-100 pt-3 mt-4">
        <p className="font-inter text-[11px] md:text-xs text-ci-gray leading-relaxed font-light">
          {item.bio}
        </p>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 right-0 h-1.5 w-16 rounded-tl-md bg-gradient-to-r from-transparent to-ci-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

function MarqueeRow({
  data,
  reverse = false,
  speed = 35,
}: {
  data: PortraitItem[];
  reverse?: boolean;
  speed?: number;
}) {
  // Triple the data to ensure smooth infinite loop coverage on wide screens
  const tripled = React.useMemo(() => [...data, ...data, ...data], [data]);
  return (
    <div className="relative w-full overflow-hidden py-4 isolation-isolate">
      {/* Smooth gradients on the edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-48 z-10 bg-gradient-to-r from-ci-cream via-ci-cream/80 to-transparent" />
      
      <div
        className="flex transform-gpu min-w-[300%]"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {tripled.map((item, i) => (
          <PortraitCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-48 z-10 bg-gradient-to-l from-ci-cream via-ci-cream/80 to-transparent" />
    </div>
  );
}

export const Portraits: React.FC = () => {
  // Split portraits into two rows for the marquee
  const row1 = PORTRAITS.slice(0, 3);
  const row2 = PORTRAITS.slice(3, 6);

  return (
    <section
      id="portraits"
      className="py-20 md:py-28 bg-ci-cream overflow-hidden"
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <SectionLabel color="green">Visages & Modèles</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les visages de l'<span className="font-semibold text-ci-orange">excellence mathématique</span> ivoirienne
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Rencontrez des femmes et des hommes qui traduisent chaque jour la logique pure en impacts majeurs pour le développement de notre nation.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-2 md:gap-4 w-full">
        <MarqueeRow data={row1} reverse={false} speed={40} />
        <MarqueeRow data={row2} reverse={true} speed={40} />
      </div>
    </section>
  );
};
