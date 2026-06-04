'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gérer l'état du scroll pour modifier l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Domaines', href: '#why-math' },
    { label: 'Impact', href: '#real-life' },
    { label: 'Parcours', href: '#sticky-scroll' },
    { label: 'Portraits', href: '#portraits' },
    { label: 'Opportunités', href: '#opportunities' },
    { label: 'Agenda', href: '#agenda' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ci-cream/85 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-1.5 group select-none">
          <span className="font-poppins font-bold text-xl md:text-2xl text-ci-dark tracking-tight">
            MathSci<span className="text-ci-green group-hover:text-ci-orange transition-colors duration-200"> CI</span>
          </span>
          <span className="text-[10px] bg-ci-orange/10 text-ci-orange px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-inter">
            225
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-sm font-medium text-ci-gray hover:text-ci-dark transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-ci-green after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a href="#mission">
            <Button variant="primary" className="flex items-center gap-2 text-sm">
              Nous rejoindre <ArrowUpRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-ci-dark hover:bg-ci-sand/40 rounded-full transition-colors cursor-pointer"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-ci-cream border-t border-gray-200 transition-all duration-300 ease-in-out z-40 flex flex-col justify-between p-6 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-6 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-poppins text-lg font-medium text-ci-dark hover:text-ci-green transition-colors py-2 border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="w-full pb-8">
          <a href="#mission" onClick={() => setIsOpen(false)}>
            <Button variant="primary" className="w-full py-4 text-base flex items-center justify-center gap-2">
              Nous rejoindre <ArrowUpRight className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
