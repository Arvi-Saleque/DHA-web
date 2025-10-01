import React, { useState } from 'react';
import Table, { TableColumn } from '../ui/Table';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ExamSession {
  id: string;
  date: string;
  time: string;
  subject: string;
  duration: string;
  room: string;
  invigilator: string;
  maxMarks: number;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
  instructions?: string;
}

interface ExamRoutineTableProps {
  sessions: ExamSession[];
  title?: string;
  editable?: boolean;
  onEdit?: (session: ExamSession) => void;
  onDelete?: (sessionId: string) => void;
  onAdd?: () => void;
  className?: string;
}

// Badge component (if not already created)
function Badge({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' 
}) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

export default function ExamRoutineTable({
  sessions,
  title = 'Exam Schedule',
  editable = false,
  onEdit,
  onDelete,
  onAdd,
  className = ''
}: ExamRoutineTableProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const getExamTypeColor = (type: ExamSession['examType']) => {
    switch (type) {
      case 'final': return 'error';
      case 'midterm': return 'warning';
      case 'quiz': return 'info';
      case 'assignment': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isUpcoming = (dateString: string, timeString: string) => {
    const examDateTime = new Date(`${dateString}T${timeString}`);
    return examDateTime > new Date();
  };

  const isPast = (dateString: string, timeString: string) => {
    const examDateTime = new Date(`${dateString}T${timeString}`);
    return examDateTime < new Date();
  };

  const columns: TableColumn[] = [
    {
      key: 'date',
      label: 'Date & Time',
      sortable: true,
      render: (_, session: ExamSession) => (
        <div>
          <div className="font-medium text-gray-900">
            {formatDate(session.date)}
          </div>
          <div className="text-sm text-gray-500">
            {formatTime(session.time)}
          </div>
          <div className="text-xs text-gray-400">
            {session.duration}
          </div>
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (_, session: ExamSession) => (
        <div>
          <div className="font-medium text-gray-900">{session.subject}</div>
          <Badge variant={getExamTypeColor(session.examType)}>
            {session.examType.charAt(0).toUpperCase() + session.examType.slice(1)}
          </Badge>
        </div>
      )
    },
    {
      key: 'room',
      label: 'Room',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {value}
        </span>
      )
    },
    {
      key: 'invigilator',
      label: 'Invigilator',
      sortable: true
    },
    {
      key: 'maxMarks',
      label: 'Max Marks',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-blue-600">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, session: ExamSession) => {
        if (isPast(session.date, session.time)) {
          return <Badge variant="default">Completed</Badge>;
        } else if (isUpcoming(session.date, session.time)) {
          return <Badge variant="success">Upcoming</Badge>;
        } else {
          return <Badge variant="warning">Today</Badge>;
        }
      }
    }
  ];

  if (editable) {
    columns.push({
      key: 'actions',
      label: 'Actions',
      render: (_, session: ExamSession) => (
        <div className="flex space-x-2">
          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(session)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(session.id)}
            >
              Delete
            </Button>
          )}
        </div>
      )
    });
  }

  const handleRowSelect = (sessionId: string) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedSessions(sessions.map(s => s.id));
    } else {
      setSelectedSessions([]);
    }
  };

  // Group sessions by date for better organization
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = session.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, ExamSession[]>);

  return (
    <div className={className}>
      <Card>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {sessions.length} exam session{sessions.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          
          {editable && onAdd && (
            <Button onClick={onAdd}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Exam
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.filter(s => isUpcoming(s.date, s.time)).length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {sessions.filter(s => isPast(s.date, s.time)).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {sessions.filter(s => s.examType === 'final').length}
            </div>
            <div className="text-sm text-gray-600">Final Exams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sessions.reduce((sum, s) => sum + s.maxMarks, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Marks</div>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={sessions}
          searchable={true}
          sortable={true}
          paginated={true}
          pageSize={10}
          emptyMessage="No exam sessions scheduled"
          selectedRows={selectedSessions}
          onRowSelect={editable ? handleRowSelect : undefined}
          onSelectAll={editable ? handleSelectAll : undefined}
          rowIdKey="id"
        />

        {/* Bulk Actions */}
        {editable && selectedSessions.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-800">
                {selectedSessions.length} session{selectedSessions.length !== 1 ? 's' : ''} selected
              </span>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Export Selected
                </Button>
                <Button variant="danger" size="sm">
                  Delete Selected
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Individual Exam Card Component (for mobile or card view)
interface ExamCardProps {
  session: ExamSession;
  onEdit?: () => void;
  onDelete?: () => void;
  compact?: boolean;
}

export function ExamCard({ session, onEdit, onDelete, compact = false }: ExamCardProps) {
  const getExamTypeColor = (type: ExamSession['examType']) => {
    switch (type) {
      case 'final': return 'error';
      case 'midterm': return 'warning';
      case 'quiz': return 'info';
      case 'assignment': return 'success';
      default: return 'default';
    }
  };

  const isUpcoming = (dateString: string, timeString: string) => {
    const examDateTime = new Date(`${dateString}T${timeString}`);
    return examDateTime > new Date();
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{session.subject}</h3>
            <Badge variant={getExamTypeColor(session.examType)}>
              {session.examType.charAt(0).toUpperCase() + session.examType.slice(1)}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>📅 {new Date(session.date).toLocaleDateString()}</span>
              <span>🕐 {session.time}</span>
              <span>⏱️ {session.duration}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🏫 Room {session.room}</span>
              <span>👨‍🏫 {session.invigilator}</span>
              <span>📊 {session.maxMarks} marks</span>
            </div>
          </div>
          
          {session.instructions && !compact && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">{session.instructions}</p>
            </div>
          )}
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex space-x-2 ml-4">
            {onEdit && (
              <Button size="sm" variant="outline" onClick={onEdit}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button size="sm" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}