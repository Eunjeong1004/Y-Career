import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  disabled,
  variant = 'primary',
  ...props 
}) => {
  // Spec D1: Height 48px, Padding 0 20px, Radius 8px
  // Typography: 16px, 700 weight, 24px line-height
  const baseStyles = "h-[48px] px-[20px] rounded-[8px] text-[16px] font-bold leading-[24px] transition-all duration-200 flex items-center justify-center whitespace-nowrap";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed",
    secondary: "bg-white text-text-gray border border-border hover:bg-bg-light hover:text-text-main",
    outline: "bg-transparent border border-primary text-primary hover:bg-blue-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};