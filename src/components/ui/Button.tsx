import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className = '', children, ...props }, ref) => {
    // Base styles common to all buttons
    const baseStyle = "inline-flex items-center justify-center font-inter font-medium rounded-pill transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ci-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center";

    // Variant styles
    const variantStyles = {
      primary: "bg-ci-orange text-white hover:bg-ci-orange-soft shadow-sm",
      outline: "border border-ci-green text-ci-green bg-transparent hover:bg-ci-green-light",
      ghost: "bg-transparent text-ci-gray hover:text-ci-dark hover:bg-ci-sand/40"
    };

    // Size styles
    const sizeStyles = {
      default: "px-5 py-2.5 md:px-6 md:py-2.5 text-base",
      sm: "px-3.5 py-1.5 text-xs",
      lg: "px-7 py-3 text-lg"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
