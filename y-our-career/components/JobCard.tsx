import React from 'react';
import { Job } from '../types';
import { Tag } from './Tag';
import { Button } from './Button';
import { Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  onTagClick?: (tag: string) => void;
  isPriority?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, onTagClick, isPriority = false }) => {
  // Spec D3: Padding 20px, Border #E8E8E8, Radius 12px
  // Spacing: Title->Company 8px, Company->Tags 8px, Tags->Reason 12px, Reason->Button 16px
  
  return (
    <div 
      onClick={onClick}
      className={`
        w-full 
        p-[20px] 
        border 
        rounded-[12px] 
        bg-white 
        transition-all duration-200
        flex flex-col
        cursor-pointer
        group
        ${isPriority ? 'border-accent shadow-md ring-1 ring-accent/20' : 'border-border hover:shadow-card hover:border-transparent'}
      `}
    >
      {/* Title */}
      <h3 className="text-[20px] font-bold text-text-main leading-tight mb-[8px] line-clamp-1 group-hover:text-primary transition-colors">
        {job.title}
      </h3>
      
      {/* Company & Meta */}
      <div className="flex items-center text-[15px] text-text-gray mb-[8px] gap-3">
        <span className="font-medium text-text-main">{job.company}</span>
        <span className="h-3 w-px bg-gray-300"></span>
        <span className="flex items-center gap-1 text-[13px]">
           <Calendar size={13} /> {job.deadline}
        </span>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-[12px]">
        {job.tags.slice(0, 3).map(tag => (
          <Tag 
            key={tag} 
            label={`#${tag}`} 
            onClick={(e) => {
              if (onTagClick) {
                e.stopPropagation();
                onTagClick(tag);
              }
            }}
          />
        ))}
      </div>
      
      {/* Reason */}
      <div className="mb-[16px] flex-grow">
         <p className="text-[14px] text-primary bg-bg-light p-3 rounded-lg font-medium leading-relaxed">
           "{job.reason}"
         </p>
      </div>
      
      {/* Button */}
      {/* Button visual only, click handled by card container */}
      <Button className="w-full pointer-events-none">
        자세히 보기
      </Button>
    </div>
  );
};