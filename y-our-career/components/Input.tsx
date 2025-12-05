import React from 'react';
import { InputProps } from '../types';

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  // Spec D2: Height 44px, Border 1px #E8E8E8, Radius 8px, Padding 12px
  // Focus: border #003E8C
  // Error: Border #D94141, Text 13px Red
  // Spacing: Label->Input 8px
  
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[14px] font-medium text-text-main mb-[8px]">
          {label}
        </label>
      )}
      <input
        className={`
          h-[44px] 
          px-[12px] 
          border 
          rounded-[8px] 
          bg-white
          text-text-main
          text-[16px]
          outline-none
          transition-colors
          disabled:bg-bg-light disabled:cursor-not-allowed
          ${error 
            ? 'border-status-error focus:border-status-error' 
            : 'border-border focus:border-primary'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-status-error text-[13px] leading-[18px] mt-[4px]">
          {error}
        </span>
      )}
    </div>
  );
};