import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Domaines', href: '#why-math' },
    { label: 'Impact', href: '#real-life' },
    { label: 'Parcours', href: '#sticky-scroll' },
    { label: 'Portraits', href: '#portraits' },
    { label: 'Opportunités', href: '#opportunities' },
    { label: 'Agenda', href: '#agenda' },
  ];

  const resourceLinks = [
    { label: 'INP-HB Yamoussoukro', href: 'https://inphb.ci/', external: true },
    { label: 'ENSEA Abidjan', href: 'https://ensea.ed.ci/', external: true },
    { label: 'Ministère de l\'Éducation (MENA)', href: 'https://education.gouv.ci/', external: true },
    { label: 'MESRS Côte d\'Ivoire', href: 'https://enseignement.gouv.ci/', external: true },
  ];

  return (
    <footer className="bg-ci-dark text-white border-t border-white/10 pt-16 pb-8 font-inter">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Colonne 1: À Propos */}
        <div className="space-y-4">
          <span className="font-poppins font-bold text-2xl tracking-tight block">
            MathSci<span className="text-ci-green"> CI</span>
          </span>
          <p className="text-sm text-ci-gray leading-relaxed max-w-sm">
            Faire des mathématiques le levier d'excellence de la génération qui construira la Côte d'Ivoire de 2050.
          </p>
          <div className="flex items-center gap-2 text-sm text-ci-gray hover:text-white transition-colors duration-200">
            <Mail className="h-4 w-4 text-ci-orange" />
            <a href="mailto:contact@mathsci.ci">contact@mathsci.ci</a>
          </div>
        </div>

        {/* Colonne 2: Navigation rapide */}
        <div>
          <h4 className="font-poppins font-semibold text-sm tracking-wider uppercase mb-6 text-ci-orange">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ci-gray hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3: Ressources et Liens externes */}
        <div>
          <h4 className="font-poppins font-semibold text-sm tracking-wider uppercase mb-6 text-ci-green">
            Ressources
          </h4>
          <ul className="space-y-3 text-sm">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-ci-gray hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  {link.label}
                  {link.external && (
                    <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4: Réseaux Sociaux */}
        <div>
          <h4 className="font-poppins font-semibold text-sm tracking-wider uppercase mb-6 text-white">
            Suivez-nous
          </h4>
          <p className="text-sm text-ci-gray leading-relaxed mb-6">
            Rejoignez notre communauté de passionnés des sciences et des technologies.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-ci-gray hover:text-white hover:border-white transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-ci-gray hover:text-white hover:border-white transition-all duration-200"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-ci-gray hover:text-white hover:border-white transition-all duration-200"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Rangée Basse: Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ci-gray text-center md:text-left">
        <p>
          &copy; {currentYear} MathSci CI. Tous droits réservés.
        </p>
        <p className="flex items-center gap-1 justify-center md:justify-end">
          Conçu pour l'excellence académique en Côte d'Ivoire 🇨🇮
        </p>
      </div>
    </footer>
  );
};
