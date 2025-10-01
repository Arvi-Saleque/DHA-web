import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  defaultTab?: number;
  onChange?: (index: number) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export function Tab({ label, children, disabled, icon, badge }: TabProps) {
  // This component is used as a child of Tabs, props are handled by parent
  return null;
}

export default function Tabs({ 
  children, 
  defaultTab = 0, 
  onChange,
  className = '',
  variant = 'default',
  size = 'md'
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index: number) => {
    if (children[index]?.props.disabled) return;
    setActiveTab(index);
    onChange?.(index);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    default: {
      container: 'border-b border-gray-200',
      tab: `border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 transition-colors duration-200`,
      activeTab: 'border-blue-500 text-blue-600',
      inactiveTab: 'text-gray-500'
    },
    pills: {
      container: 'bg-gray-100 rounded-lg p-1',
      tab: 'rounded-md transition-colors duration-200',
      activeTab: 'bg-white text-blue-600 shadow-sm',
      inactiveTab: 'text-gray-600 hover:text-gray-900'
    },
    underline: {
      container: '',
      tab: 'border-b-2 border-transparent hover:border-gray-200 transition-colors duration-200',
      activeTab: 'border-blue-500 text-blue-600',
      inactiveTab: 'text-gray-600 hover:text-gray-900'
    }
  };

  const classes = variantClasses[variant];

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className={`flex space-x-1 ${classes.container}`}>
        {children.map((child, index) => {
          const { label, disabled, icon, badge } = child.props;
          const isActive = activeTab === index;

          return (
            <button
              key={index}
              className={`
                flex items-center space-x-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                ${sizeClasses[size]}
                ${classes.tab}
                ${isActive ? classes.activeTab : classes.inactiveTab}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => handleTabChange(index)}
              disabled={disabled}
            >
              {icon && <span>{icon}</span>}
              <span>{label}</span>
              {badge && (
                <span className={`
                  inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-medium rounded-full
                  ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}
                `}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {children[activeTab]?.props.children}
      </div>
    </div>
  );
}

// Predefined Student Profile Tabs Component
interface StudentProfileTabsProps {
  studentId: string;
  attendanceContent: React.ReactNode;
  examsContent: React.ReactNode;
  resultsContent: React.ReactNode;
  feesContent?: React.ReactNode;
  className?: string;
}

export function StudentProfileTabs({
  studentId,
  attendanceContent,
  examsContent,
  resultsContent,
  feesContent,
  className
}: StudentProfileTabsProps) {
  const tabs = [
    {
      label: "Attendance",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: attendanceContent
    },
    {
      label: "Exams",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: examsContent
    },
    {
      label: "Results",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      content: resultsContent
    }
  ];

  if (feesContent) {
    tabs.push({
      label: "Fees",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      content: feesContent
    });
  }

  return (
    <Tabs className={className} variant="underline">
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} icon={tab.icon}>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
}