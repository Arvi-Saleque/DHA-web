import React from 'react';

interface TimelineItemProps {
  title: string;
  description?: string;
  date: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  isLast?: boolean;
}

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

export default function Timeline({ items, className = '' }: TimelineProps) {
  const typeConfig = {
    default: {
      dotColor: 'bg-gray-400',
      lineColor: 'bg-gray-300'
    },
    success: {
      dotColor: 'bg-green-500',
      lineColor: 'bg-gray-300'
    },
    warning: {
      dotColor: 'bg-yellow-500',
      lineColor: 'bg-gray-300'
    },
    error: {
      dotColor: 'bg-red-500',
      lineColor: 'bg-gray-300'
    },
    info: {
      dotColor: 'bg-blue-500',
      lineColor: 'bg-gray-300'
    }
  };

  const getDefaultIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flow-root ${className}`}>
      <ul className="-mb-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const config = typeConfig[item.type || 'default'];
          
          return (
            <li key={index}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${config.lineColor}`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`
                        h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                        ${config.dotColor}
                      `}
                    >
                      {item.icon || getDefaultIcon(item.type || 'default')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time>{item.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Predefined Student Activity Timeline
interface StudentActivityTimelineProps {
  studentId: string;
  activities: Array<{
    id: string;
    type: 'enrollment' | 'exam' | 'result' | 'attendance' | 'fee_payment' | 'scholarship';
    title: string;
    description?: string;
    date: string;
  }>;
  className?: string;
}

export function StudentActivityTimeline({ 
  studentId, 
  activities, 
  className 
}: StudentActivityTimelineProps) {
  const getActivityType = (type: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (type) {
      case 'enrollment':
      case 'fee_payment':
      case 'scholarship':
        return 'success';
      case 'exam':
      case 'result':
        return 'info';
      case 'attendance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const timelineItems: TimelineItemProps[] = activities.map(activity => ({
    title: activity.title,
    description: activity.description,
    date: activity.date,
    type: getActivityType(activity.type)
  }));

  return <Timeline items={timelineItems} className={className} />;
}

// Scholarship History Timeline
interface ScholarshipHistoryTimelineProps {
  scholarships: Array<{
    id: string;
    title: string;
    amount: number;
    status: 'awarded' | 'pending' | 'rejected';
    date: string;
    description?: string;
  }>;
  className?: string;
}

export function ScholarshipHistoryTimeline({ 
  scholarships, 
  className 
}: ScholarshipHistoryTimelineProps) {
  const getStatusType = (status: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'awarded':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const timelineItems: TimelineItemProps[] = scholarships.map(scholarship => ({
    title: `${scholarship.title} - $${scholarship.amount}`,
    description: scholarship.description || `Status: ${scholarship.status}`,
    date: scholarship.date,
    type: getStatusType(scholarship.status)
  }));

  return <Timeline items={timelineItems} className={className} />;
}