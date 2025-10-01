import React from 'react';

interface ListItemProps {
  title: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: {
    text: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  };
  meta?: string; // For timestamps, dates, etc.
}

export default function ListItem({
  title,
  description,
  leftIcon,
  rightIcon,
  rightContent,
  onClick,
  className = '',
  active = false,
  disabled = false,
  badge,
  meta
}: ListItemProps) {
  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <div
      className={`
        flex items-center p-4 border-b border-gray-200 last:border-b-0
        ${onClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
        ${active ? 'bg-blue-50 border-blue-200' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        transition-colors duration-150
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Left Icon */}
      {leftIcon && (
        <div className="flex-shrink-0 mr-3">
          {leftIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-medium ${active ? 'text-blue-900' : 'text-gray-900'} truncate`}>
            {title}
          </h3>
          
          {/* Meta info (timestamp, etc.) */}
          {meta && (
            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
              {meta}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Badge */}
        {badge && (
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2
            ${badgeColors[badge.color || 'gray']}
          `}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Right Content */}
      {rightContent && (
        <div className="flex-shrink-0 ml-3">
          {rightContent}
        </div>
      )}

      {/* Right Icon */}
      {rightIcon && !rightContent && (
        <div className="flex-shrink-0 ml-3">
          {rightIcon}
        </div>
      )}
      
      {/* Default chevron icon if clickable but no right content/icon */}
      {onClick && !rightIcon && !rightContent && (
        <div className="flex-shrink-0 ml-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

// List container component for better styling
interface ListProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  shadow?: boolean;
  border?: boolean;
}

export function List({ 
  children, 
  className = '', 
  title, 
  shadow = true, 
  border = true 
}: ListProps) {
  return (
    <div className={`
      bg-white rounded-lg overflow-hidden
      ${shadow ? 'shadow-sm' : ''}
      ${border ? 'border border-gray-200' : ''}
      ${className}
    `}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}