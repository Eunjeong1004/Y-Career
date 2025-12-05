import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Job } from '../types';
import { Button } from './Button';
import { Tag } from './Tag';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Click outside dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (job) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [job, onClose]);

  if (!job) return null;

  // Spec D6: Width 480px, Padding 32px, Radius 16px, Shadow modal
  // Overlay for centering
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div 
        ref={modalRef}
        className="
          w-full max-w-[480px] 
          bg-white 
          rounded-[16px] 
          shadow-modal 
          p-[32px] 
          relative
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-[24px] right-[24px] text-text-gray hover:text-text-main transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content Header */}
        <div className="mb-[24px]">
          <h2 className="text-[24px] font-bold text-text-main leading-tight mb-[8px]">
            {job.title}
          </h2>
          <p className="text-[18px] text-text-gray font-medium">
            {job.company}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-[24px]">
          {job.tags.map(tag => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Reason Block */}
        <div className="bg-bg-light p-[16px] rounded-[8px] mb-[24px]">
          <h4 className="text-[14px] font-bold text-primary mb-[4px]">Why Recommended</h4>
          <p className="text-[14px] text-text-main leading-relaxed">
            {job.reason}
          </p>
        </div>

        {/* Description */}
        <div className="mb-[32px]">
          <h4 className="text-[16px] font-bold text-text-main mb-[8px]">Description</h4>
          <p className="text-[16px] text-text-gray leading-[24px]">
            {job.description}
          </p>
        </div>

        {/* Action */}
        <Button className="w-full" onClick={() => alert(`Applied to ${job.title}!`)}>
          Apply Now
        </Button>
      </div>
    </div>
  );
};