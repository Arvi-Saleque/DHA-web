'use client';

import { ReactNode } from 'react';

interface DeleteItemButtonProps {
  children: ReactNode;
  onConfirm: () => void;
  className?: string;
}

export default function DeleteItemButton({ 
  children, 
  onConfirm, 
  className = "text-red-600 hover:text-red-900 text-xs" 
}: DeleteItemButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
      onConfirm();
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}