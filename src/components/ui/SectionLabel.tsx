import React from 'react';

export interface SectionLabelProps {
  children: React.ReactNode;
  color?: 'orange' | 'green';
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, color = 'orange', className = '' }) => {
  const textColor = color === 'orange' ? 'text-ci-orange' : 'text-ci-green';
  const dotColor = color === 'orange' ? 'bg-ci-orange' : 'bg-ci-green';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase font-inter ${textColor}`}>
        {children}
      </span>
    </div>
  );
};
