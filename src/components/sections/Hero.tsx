'use client';

import React, { useRef } from 'react';
import { ArrowDown, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionLabel } from '../ui/SectionLabel';
import { gsap, useGSAP } from '@/lib/gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathIllustrationRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // Stop animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline for hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', { y: -20, autoAlpha: 0, duration: 0.8 })
      .from('.hero-title', { y: 40, autoAlpha: 0, duration: 1 }, '-=0.5')
      .from('.hero-subtitle', { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-ctas', { y: 25, autoAlpha: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-scroll-btn', { autoAlpha: 0, y: 10, duration: 0.6 }, '-=0.2');

    // Floating animation for mathematical elements in SVG
    gsap.to('.math-float', {
      y: 'random(-15, 15)',
      x: 'random(-10, 10)',
      rotation: 'random(-10, 10)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    });

    // Parallax on scroll for the SVG illustration
    if (mathIllustrationRef.current) {
      gsap.to(mathIllustrationRef.current, {
        y: 120,
        rotation: 8,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-ci-cream pt-20 pb-16 md:py-24"
    >
      {/* Background Gradient Mesh - Stripe inspired */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Layered blobs with subtle blurs to form an organic mesh in Ivory Coast tones */}
          <circle cx="200" cy="100" r="350" fill="url(#orange-grad)" filter="url(#blur-large)" />
          <circle cx="1200" cy="200" r="450" fill="url(#green-grad)" filter="url(#blur-large)" />
          <circle cx="700" cy="400" r="300" fill="url(#yellow-grad)" filter="url(#blur-large)" />
          
          <defs>
            <radialGradient id="orange-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="green-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#006B40" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#006B40" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="yellow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9A3C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FF9A3C" stopOpacity="0" />
            </radialGradient>
            <filter id="blur-large" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="90" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 md:space-y-8">
          <div className="hero-badge">
            <Badge variant="orange" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" /> Excellence Scientifique en Côte d'Ivoire
            </Badge>
          </div>

          <div className="space-y-4">
            <SectionLabel color="green" className="hero-badge">PORTAIL NATIONAL STEM</SectionLabel>
            <h1 className="hero-title font-poppins text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-ci-dark leading-[1.05] max-w-xl">
              Les mathématiques au{' '}
              <span className="font-semibold text-ci-orange relative inline-block">
                cœur de l'avenir
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-ci-orange/15 rounded-full" />
              </span>{' '}
              ivoirien.
            </h1>
          </div>

          <p className="hero-subtitle font-inter text-base md:text-lg text-ci-gray leading-relaxed max-w-lg font-light">
            Découvrez comment les mathématiques façonnent le développement technologique, l'intelligence artificielle, l'actuariat et les filières d'excellence qui construisent la Côte d'Ivoire de 2050.
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a href="#sticky-scroll" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2 group">
                <GraduationCap className="h-5 w-5" /> Explorer les Parcours
              </Button>
            </a>
            <a href="#portraits" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center">
                Rencontrer nos Modèles
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Mathematical Visual Showcase */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative h-[300px] sm:h-[400px] lg:h-[500px]">
          <svg
            ref={mathIllustrationRef}
            className="w-full max-w-[400px] lg:max-w-none h-full max-h-[450px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            fill="none"
          >
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="opacity-40" />

            {/* Glowing orb in the center */}
            <circle cx="250" cy="250" r="120" fill="url(#glow)" className="opacity-30" />
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#006B40" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
            </radialGradient>

            {/* Glowing coordinate axes */}
            <line x1="50" y1="250" x2="450" y2="250" stroke="#6B7280" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
            <line x1="250" y1="50" x2="250" y2="450" stroke="#6B7280" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />

            {/* Sine/Cosine wavy curves */}
            <path
              d="M 50 300 Q 150 150 250 250 T 450 200"
              fill="none"
              stroke="url(#orange-stroke)"
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_4px_12px_rgba(255,122,0,0.2)]"
            />
            <path
              d="M 50 200 Q 150 350 250 250 T 450 300"
              fill="none"
              stroke="url(#green-stroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 6"
              className="opacity-70"
            />

            <linearGradient id="orange-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9A3C" />
              <stop offset="100%" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="green-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8F5EE" />
              <stop offset="100%" stopColor="#006B40" />
            </linearGradient>

            {/* Mathematical Floating Elements (reacting to GSAP) */}
            {/* Sigma Symbol */}
            <g className="math-float" style={{ transformOrigin: '150px 180px' }}>
              <circle cx="150" cy="180" r="30" fill="white" stroke="#E5E7EB" strokeWidth="1" className="shadow-sm" />
              <text x="150" y="188" fontSize="24" fontFamily="serif" fill="#006B40" textAnchor="middle" fontWeight="bold">∑</text>
            </g>

            {/* Pi Symbol */}
            <g className="math-float" style={{ transformOrigin: '350px 320px' }}>
              <circle cx="350" cy="320" r="26" fill="white" stroke="#E5E7EB" strokeWidth="1" className="shadow-sm" />
              <text x="350" y="327" fontSize="20" fontFamily="serif" fill="#FF7A00" textAnchor="middle" fontWeight="bold">π</text>
            </g>

            {/* Integral Symbol */}
            <g className="math-float" style={{ transformOrigin: '360px 130px' }}>
              <circle cx="360" cy="130" r="32" fill="white" stroke="#E5E7EB" strokeWidth="1" className="shadow-sm" />
              <text x="360" y="139" fontSize="28" fontFamily="serif" fill="#1A1A1A" textAnchor="middle">∫</text>
            </g>

            {/* Infinity Symbol */}
            <g className="math-float" style={{ transformOrigin: '130px 330px' }}>
              <circle cx="130" cy="330" r="28" fill="white" stroke="#E5E7EB" strokeWidth="1" className="shadow-sm" />
              <text x="130" y="337" fontSize="22" fontFamily="sans-serif" fill="#6B7280" textAnchor="middle">∞</text>
            </g>

            {/* f(x) label */}
            <g className="math-float" style={{ transformOrigin: '250px 250px' }}>
              <rect x="215" y="235" width="70" height="30" rx="15" fill="#1A1A1A" />
              <text x="250" y="255" fontSize="12" fontFamily="monospace" fill="white" textAnchor="middle">f(x) = dy/dx</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hero-scroll-btn flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-bold tracking-widest text-ci-gray">Découvrir</span>
        <a href="#why-math" className="h-9 w-9 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm hover:border-ci-orange hover:text-ci-orange transition-all duration-300 animate-bounce">
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};
