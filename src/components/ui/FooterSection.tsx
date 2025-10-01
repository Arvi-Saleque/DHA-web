'use client';

import React from 'react';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FooterSection({ 
  title, 
  children, 
  className = '' 
}: FooterSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-bold text-yellow-300 mb-6 relative">
        {title}
        <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent"></div>
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}