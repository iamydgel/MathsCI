import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'orange' | 'green' | 'dark';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'orange', className = '', children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 rounded-pill text-[10px] font-bold tracking-wider uppercase border font-inter select-none";
  
  const variantStyles = {
    orange: "bg-ci-orange/10 text-ci-orange border-ci-orange/20",
    green: "bg-ci-green-light text-ci-green border-ci-green/20",
    dark: "bg-ci-dark text-white border-transparent"
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
