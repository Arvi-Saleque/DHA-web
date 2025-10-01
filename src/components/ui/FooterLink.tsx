'use client';

import Link from 'next/link';
import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export default function FooterLink({ 
  href, 
  children, 
  external = false,
  className = '' 
}: FooterLinkProps) {
  const linkClasses = `
    text-gray-300 hover:text-white hover:translate-x-1
    transition-all duration-200 text-sm block py-1
    border-l-2 border-transparent hover:border-yellow-300 pl-3
    ${className}
  `;

  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}