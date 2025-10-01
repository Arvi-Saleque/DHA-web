'use client';

import React from 'react';

interface SocialMediaIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export default function SocialMediaIcon({ 
  href, 
  icon, 
  label, 
  className = '' 
}: SocialMediaIconProps) {
  return (
    <a
      href={href}
      className={`
        inline-flex items-center justify-center w-10 h-10 
        text-gray-400 bg-gray-800/50 rounded-full 
        hover:text-yellow-300 hover:bg-gray-700/80 
        transition-all duration-300 transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-yellow-300/50
        ${className}
      `}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}