import React from 'react';

export type JobType = '채용' | '비교과';
export type JobSubtype = '인턴' | '정규직' | '계약직' | '부트캠프' | '워크숍' | '특강' | '멘토링' | '컨설팅';

export interface Job {
  id: string;
  type: JobType;
  subtype: string; // e.g., "인턴", "정규직", "워크숍"
  title: string;
  company: string; // Institution/Company name
  industry?: string; // Add industry for filtering
  employment_type?: string;
  firm_type?: string;
  region?: string;
  deadline: string;
  tags: string[]; // parsed from keywords
  description: string;
  reason: string; // "Reason for recommendation" (AI Generated or Hardcoded)
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  timestamp: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'small';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface OnboardingData {
  academic: {
    year: string;
    major: string;
  };
  career: {
    roles: string[];
    industries: string[];
  };
  personal: {
    name: string;
    email: string;
    employmentType: string[];
  };
  keywords: string[];
  notificationOptIn: boolean;
}