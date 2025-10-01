import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  showPercentage?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showPercentage = true,
  label,
  className = '',
  animated = false
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600'
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`
            ${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-in-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress Component
interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  showPercentage?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  size = 100,
  strokeWidth = 8,
  color = 'blue',
  showPercentage = true,
  className = ''
}: CircularProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    blue: 'stroke-blue-600',
    green: 'stroke-green-600',
    yellow: 'stroke-yellow-600',
    red: 'stroke-red-600',
    purple: 'stroke-purple-600'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-300 ease-in-out ${colorClasses[color]}`}
        />
      </svg>
      {showPercentage && (
        <div className="absolute flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

// Multi-step Progress Bar
interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

interface StepProgressProps {
  steps: Step[];
  className?: string;
}

export function StepProgress({ steps, className = '' }: StepProgressProps) {
  return (
    <nav className={className}>
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {/* Connector line */}
            {stepIdx !== steps.length - 1 && (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`h-0.5 w-full ${
                  step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              </div>
            )}
            
            <div className="relative flex items-center justify-center">
              {step.status === 'completed' ? (
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : step.status === 'current' ? (
                <div className="h-8 w-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <span className={`text-xs font-medium ${
                step.status === 'current' ? 'text-blue-600' : 
                step.status === 'completed' ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Academic Progress Components
interface ExamCompletionProgressProps {
  completed: number;
  total: number;
  subject?: string;
  className?: string;
}

export function ExamCompletionProgress({
  completed,
  total,
  subject,
  className = ''
}: ExamCompletionProgressProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <ProgressBar
      value={percentage}
      label={subject ? `${subject} Exam Progress` : 'Exam Progress'}
      color={percentage === 100 ? 'green' : percentage >= 50 ? 'blue' : 'yellow'}
      className={className}
    />
  );
}

interface FeeCollectionProgressProps {
  collected: number;
  total: number;
  className?: string;
}

export function FeeCollectionProgress({
  collected,
  total,
  className = ''
}: FeeCollectionProgressProps) {
  const percentage = total > 0 ? (collected / total) * 100 : 0;
  
  return (
    <div className={className}>
      <ProgressBar
        value={percentage}
        label="Fee Collection Progress"
        color={percentage >= 80 ? 'green' : percentage >= 50 ? 'blue' : 'red'}
        showPercentage={false}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>Collected: ${collected.toLocaleString()}</span>
        <span>Target: ${total.toLocaleString()}</span>
      </div>
    </div>
  );
}