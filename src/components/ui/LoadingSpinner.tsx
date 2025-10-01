import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'gray' | 'white';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'blue',
  text,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <svg
          className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && (
          <p className={`${textSizeClasses[size]} ${colorClasses[color]} font-medium`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

// Skeleton Loader Components
interface SkeletonProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className = '', 
  lines = 1, 
  avatar = false, 
  width = '100%', 
  height = '1rem' 
}: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="rounded-full bg-gray-300 h-10 w-10 mb-3" />
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 rounded ${index < lines - 1 ? 'mb-2' : ''}`}
          style={{ 
            width: index === lines - 1 ? '75%' : width, 
            height 
          }}
        />
      ))}
    </div>
  );
}

// Card Skeleton
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gray-200 rounded-lg p-6 ${className}`}>
      <Skeleton avatar lines={3} />
    </div>
  );
}

// Table Skeleton
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}: SkeletonTableProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header */}
      <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="border-x border-b border-gray-200 rounded-b-lg">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`p-4 ${rowIndex < rows - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-300 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// List Skeleton
interface SkeletonListProps {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}

export function SkeletonList({ 
  items = 5, 
  showAvatar = false, 
  className = '' 
}: SkeletonListProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
          {showAvatar && (
            <div className="rounded-full bg-gray-300 h-10 w-10 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Page Loading Component
interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({ 
  message = 'Loading...', 
  className = '' 
}: PageLoadingProps) {
  return (
    <div className={`flex items-center justify-center min-h-64 ${className}`}>
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}

// Inline Loading Component
interface InlineLoadingProps {
  text?: string;
  className?: string;
}

export function InlineLoading({ 
  text = 'Loading...', 
  className = '' 
}: InlineLoadingProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LoadingSpinner size="sm" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
}