'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, RefreshCw } from 'lucide-react';
import { EventItem } from '@/lib/constants/content';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

// Squelette de chargement premium (Shimmer effect)
const AgendaSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border border-gray-200/50 p-5 md:p-6 bg-white rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-pulse"
        >
          <div className="flex flex-1 items-start gap-4">
            <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200/80 flex flex-col items-center justify-center" />
            <div className="space-y-2.5 flex-1 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-4 w-16 bg-gray-200/80 rounded" />
                <div className="h-3 w-24 bg-gray-200/80 rounded" />
              </div>
              <div className="h-5 w-3/4 bg-gray-200/80 rounded" />
              <div className="h-3 w-1/3 bg-gray-200/80 rounded" />
            </div>
          </div>
          <div className="w-full md:w-36 h-9 bg-gray-200/80 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export const Agenda: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fonction pour récupérer les événements depuis notre API scraper
  const fetchEvents = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const res = await fetch('/api/events', {
        cache: 'no-store', // S'assurer que le fetch demande la dernière version
      });
      if (!res.ok) throw new Error('Erreur de chargement');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getBadgeVariant = (type: EventItem['type']) => {
    switch (type) {
      case 'Olympiade':
        return 'orange';
      case 'Conférence':
        return 'green';
      case 'Masterclass':
        return 'green';
      case 'Salon':
        return 'orange';
      case 'Concours':
        return 'dark';
      default:
        return 'orange';
    }
  };

  // Helper pour extraire le mois et le jour du bloc de date
  const parseDateBlock = (dateStr: string) => {
    // Si la date contient un mois en lettres comme "15 Février 2026"
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      // Si la date commence par un nombre (jour)
      const day = parseInt(parts[0]);
      if (!isNaN(day)) {
        const month = parts[1].substring(0, 4).toUpperCase();
        return { day: day.toString(), month };
      }
      // Sinon, on retourne le premier mot
      return { day: '📅', month: parts[0].substring(0, 4).toUpperCase() };
    }
    return { day: '📅', month: 'STEM' };
  };

  return (
    <section
      id="agenda"
      ref={containerRef}
      className="py-20 md:py-28 bg-ci-cream border-b border-gray-100 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-2xl mx-auto relative">
          <SectionLabel color="green">Agenda Académique & STEM</SectionLabel>
          <h2 className="font-poppins text-3xl md:text-4xl font-light tracking-tight text-ci-dark leading-tight">
            Les grands rendez-vous de <span className="font-semibold text-ci-green">l'écosystème STEM</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-ci-gray leading-relaxed font-light">
            Données actualisées en temps réel depuis les sites universitaires et les réseaux scientifiques de Côte d'Ivoire.
          </p>

          {/* Bouton de forçage manuel si besoin */}
          <button
            onClick={() => fetchEvents(true)}
            disabled={isLoading || isRefreshing}
            className="absolute top-0 right-0 md:-right-24 md:top-2 text-ci-gray hover:text-ci-green transition-colors p-2 disabled:opacity-50"
            title="Actualiser les événements"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-ci-green' : ''}`} />
          </button>
        </div>

        {/* Agenda Events Stack */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AgendaSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-5xl mx-auto"
            >
              {events.map((event, idx) => {
                const dateBlock = parseDateBlock(event.date);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  >
                    <Card
                      hoverEffect={true}
                      className="agenda-row border border-gray-200/80 p-5 md:p-6 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-ci-orange/20 hover:shadow-md transition-all duration-300 rounded-2xl"
                    >
                      {/* Left Segment: Date and Title */}
                      <div className="flex flex-1 items-start gap-4">
                        {/* Visual Calendar Date Block */}
                        <div className="h-14 w-14 shrink-0 rounded-xl bg-ci-sand/40 border border-gray-200/50 flex flex-col items-center justify-center text-ci-dark select-none shadow-sm">
                          <span className="font-space-grotesk text-lg font-bold text-ci-green leading-none">
                            {dateBlock.day}
                          </span>
                          <span className="font-space-grotesk text-[9px] font-bold text-ci-gray uppercase tracking-wider mt-0.5">
                            {dateBlock.month}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-left flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={getBadgeVariant(event.type)} className="text-[9px] py-0.5 px-2">
                              {event.type}
                            </Badge>
                            <span className="font-space-grotesk text-[11px] font-medium text-ci-orange flex items-center gap-1 select-none">
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-poppins font-medium text-base md:text-lg text-ci-dark">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-ci-gray font-light">
                            <MapPin className="h-3.5 w-3.5 text-ci-green shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Segment: CTA Action */}
                      <div className="flex items-center justify-start md:justify-end">
                        <Button variant="outline" className="w-full md:w-auto text-xs md:text-sm py-2 px-4 flex items-center justify-center gap-1.5 group">
                          <span>{event.ctaLabel}</span>
                          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
