import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'stable';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  loading?: boolean;
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  changeType = 'stable',
  color = 'blue',
  loading = false,
  onClick
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    gray: 'bg-gray-50 border-gray-200 text-gray-600'
  };

  const changeColors = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    stable: 'text-gray-600'
  };

  if (loading) {
    return (
      <div className={`${colorClasses[color]} border rounded-xl p-6 shadow-sm animate-pulse`}>
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        ${colorClasses[color]} border rounded-xl p-6 shadow-sm
        ${onClick ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                {changeType === 'increase' && '+'}
                {changeType === 'decrease' && '-'}
                {change}
              </span>
              {changeType !== 'stable' && (
                <span className="text-xs text-gray-500 ml-1">this month</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}