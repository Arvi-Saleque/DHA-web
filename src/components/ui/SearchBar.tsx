import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSearchButton?: boolean;
  loading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
  disabled = false,
  className = '',
  size = 'md',
  showSearchButton = true,
  loading = false
}: SearchBarProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <svg className={`animate-spin ${iconSizeClasses[size]} text-gray-400`} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className={`${iconSizeClasses[size]} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            pl-10 ${showSearchButton ? 'pr-20' : value ? 'pr-10' : 'pr-4'}
            ${sizeClasses[size]}
          `}
        />
        
        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute inset-y-0 ${showSearchButton ? 'right-12' : 'right-3'} flex items-center`}
            disabled={disabled}
          >
            <svg className={`${iconSizeClasses[size]} text-gray-400 hover:text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Search button */}
        {showSearchButton && (
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled || loading}
            className={`
              absolute inset-y-0 right-0 flex items-center px-3 border-l border-gray-300
              bg-gray-50 hover:bg-gray-100 rounded-r-lg transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <svg className={`${iconSizeClasses[size]} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}