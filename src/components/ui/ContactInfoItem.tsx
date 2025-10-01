'use client';

import React from 'react';

interface ContactInfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function ContactInfoItem({ 
  icon, 
  children, 
  className = '' 
}: ContactInfoItemProps) {
  return (
    <div className={`flex items-start space-x-3 group ${className}`}>
      <div className="flex-shrink-0 w-5 h-5 text-yellow-300 mt-0.5 group-hover:text-white transition-colors duration-200">
        {icon}
      </div>
      <div className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
        {children}
      </div>
    </div>
  );
}