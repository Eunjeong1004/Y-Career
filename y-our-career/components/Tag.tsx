import React from 'react';

interface TagProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onClick, className = '' }) => {
  // Spec D4: Padding 6px 12px, BG #F5F7FA, Radius 8px, Font 14px Medium
  // Hover Interaction: BG #EDEFF2 (from Section G)
  return (
    <span 
      onClick={onClick}
      className={`
      inline-block 
      px-[12px] py-[6px] 
      bg-bg-light 
      rounded-[8px] 
      text-[14px] font-medium leading-[20px] text-text-gray
      transition-colors
      ${onClick ? 'cursor-pointer hover:bg-[#EDEFF2] hover:text-text-main' : 'cursor-default'}
      ${className}
    `}>
      {label}
    </span>
  );
};