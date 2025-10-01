import React, { useState } from 'react';
import Button from './Button';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type?: 'exam' | 'holiday' | 'event' | 'deadline';
  color?: string;
}

export default function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  className = '',
  events = [],
  onEventClick
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  
  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  // Get first day of the month and how many days in the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Get previous month's trailing days
  const previousMonth = new Date(year, month - 1, 0);
  const trailingDays = Array.from({ length: startingDayOfWeek }, (_, i) => {
    return new Date(year, month - 1, previousMonth.getDate() - startingDayOfWeek + i + 1);
  });
  
  // Get current month days
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(year, month, i + 1);
  });
  
  // Get next month's leading days to fill the calendar
  const totalCells = 42; // 6 rows × 7 days
  const remainingCells = totalCells - trailingDays.length - monthDays.length;
  const leadingDays = Array.from({ length: remainingCells }, (_, i) => {
    return new Date(year, month + 1, i + 1);
  });
  
  const allDays = [...trailingDays, ...monthDays, ...leadingDays];
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(month - 1);
    } else {
      newMonth.setMonth(month + 1);
    }
    setCurrentMonth(newMonth);
  };
  
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };
  
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };
  
  const isToday = (date: Date) => isSameDay(date, today);
  const isSelected = (date: Date) => value ? isSameDay(date, value) : false;
  const isCurrentMonth = (date: Date) => date.getMonth() === month;
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };
  
  const getEventColor = (type?: string) => {
    switch (type) {
      case 'exam': return 'bg-red-500';
      case 'holiday': return 'bg-green-500';
      case 'event': return 'bg-blue-500';
      case 'deadline': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    onChange?.(date);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('prev')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('next')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isDateDisabled(date)}
                className={`
                  relative p-2 h-10 text-sm rounded transition-colors duration-200
                  ${isCurrentMonth(date) ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday(date) ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                  ${isSelected(date) ? 'bg-blue-600 text-white' : ''}
                  ${!isSelected(date) && !isToday(date) && !isDateDisabled(date) ? 'hover:bg-gray-100' : ''}
                  ${isDateDisabled(date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                `}
              >
                {date.getDate()}
                
                {/* Event indicators */}
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {dayEvents.slice(0, 3).map((event, eventIndex) => (
                      <div
                        key={event.id}
                        className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" title={`+${dayEvents.length - 3} more`} />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Events list for selected/today */}
      {value && getEventsForDate(value).length > 0 && (
        <div className="border-t p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Events on {value.toLocaleDateString()}
          </h3>
          <div className="space-y-1">
            {getEventsForDate(value).map(event => (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                  <span className="text-sm text-gray-900">{event.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Academic Calendar Component
interface AcademicCalendarProps {
  academicYear: string;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

export function AcademicCalendar({
  academicYear,
  events,
  onEventClick,
  className = ''
}: AcademicCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  return (
    <div className={className}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Academic Calendar - {academicYear}
        </h2>
      </div>
      
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        events={events}
        onEventClick={onEventClick}
      />
    </div>
  );
}