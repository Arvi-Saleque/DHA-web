import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SearchBar from '../ui/SearchBar';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  avatar?: string;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  note?: string;
}

interface AttendanceSheetProps {
  students: Student[];
  date: Date;
  subject?: string;
  teacher?: string;
  onSave: (attendance: AttendanceRecord[]) => Promise<void>;
  initialAttendance?: AttendanceRecord[];
  readonly?: boolean;
  className?: string;
}

export default function AttendanceSheet({
  students,
  date,
  subject,
  teacher,
  onSave,
  initialAttendance = [],
  readonly = false,
  className = ''
}: AttendanceSheetProps) {
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>(() => {
    const initial: Record<string, AttendanceRecord> = {};
    initialAttendance.forEach(record => {
      initial[record.studentId] = record;
    });
    students.forEach(student => {
      if (!initial[student.id]) {
        initial[student.id] = {
          studentId: student.id,
          status: 'present'
        };
      }
    });
    return initial;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setSaving] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateAttendance = (studentId: string, status: AttendanceRecord['status']) => {
    if (readonly) return;
    
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
        note: notes[studentId] || undefined
      }
    }));
  };

  const updateNote = (studentId: string, note: string) => {
    if (readonly) return;
    
    setNotes(prev => ({
      ...prev,
      [studentId]: note
    }));
    
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        note: note || undefined
      }
    }));
  };

  const markAllPresent = () => {
    if (readonly) return;
    
    const newAttendance: Record<string, AttendanceRecord> = {};
    students.forEach(student => {
      newAttendance[student.id] = {
        studentId: student.id,
        status: 'present'
      };
    });
    setAttendance(newAttendance);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const attendanceRecords = Object.values(attendance);
      await onSave(attendanceRecords);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'excused': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSummary = () => {
    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: students.length
    };

    Object.values(attendance).forEach(record => {
      summary[record.status]++;
    });

    return summary;
  };

  const summary = getSummary();

  return (
    <div className={className}>
      <Card>
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Attendance Sheet
              </h2>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Date:</span> {date.toLocaleDateString()}</p>
                {subject && <p><span className="font-medium">Subject:</span> {subject}</p>}
                {teacher && <p><span className="font-medium">Teacher:</span> {teacher}</p>}
              </div>
            </div>
            
            {!readonly && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllPresent}
                >
                  Mark All Present
                </Button>
                <Button
                  onClick={handleSave}
                  loading={loading}
                  size="sm"
                >
                  Save Attendance
                </Button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{summary.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summary.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{summary.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{summary.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.excused}</div>
              <div className="text-sm text-gray-600">Excused</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search students by name or roll number..."
            showSearchButton={false}
          />
        </div>

        {/* Student List */}
        <div className="space-y-3">
          {filteredStudents.map(student => {
            const studentAttendance = attendance[student.id];
            
            return (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {/* Student Info */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {student.avatar ? (
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {getInitials(student.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      Roll: {student.rollNumber} • Class: {student.class}
                    </p>
                  </div>
                </div>

                {/* Attendance Controls */}
                <div className="flex items-center space-x-4">
                  {/* Status Buttons */}
                  <div className="flex space-x-2">
                    {(['present', 'absent', 'late', 'excused'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => updateAttendance(student.id, status)}
                        disabled={readonly}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200
                          ${studentAttendance?.status === status
                            ? getStatusColor(status)
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                          }
                          ${readonly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        `}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Note Input */}
                  {!readonly && studentAttendance?.status !== 'present' && (
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={notes[student.id] || ''}
                      onChange={(e) => updateNote(student.id, e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}

                  {/* Note Display (readonly) */}
                  {readonly && studentAttendance?.note && (
                    <span className="text-xs text-gray-600 italic">
                      {studentAttendance.note}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students found matching your search.
          </div>
        )}
      </Card>
    </div>
  );
}