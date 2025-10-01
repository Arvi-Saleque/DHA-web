import React from 'react';
import Card from '../ui/Card';

interface ResultCardProps {
  student: {
    id: string;
    name: string;
    rollNumber: string;
    class: string;
    avatar?: string;
  };
  exam: {
    name: string;
    date: string;
    type: 'midterm' | 'final' | 'quiz' | 'assignment';
  };
  subjects: Array<{
    name: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
    remarks?: string;
  }>;
  overallResult: {
    totalMarks: number;
    totalObtained: number;
    percentage: number;
    grade: string;
    gpa: number;
    position?: number;
    totalStudents?: number;
  };
  teacherComments?: string;
  className?: string;
}

export default function ResultCard({
  student,
  exam,
  subjects,
  overallResult,
  teacherComments,
  className = ''
}: ResultCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A+':
      case 'A': return 'text-green-600 bg-green-50';
      case 'B+':
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C+':
      case 'C': return 'text-yellow-600 bg-yellow-50';
      case 'D': return 'text-orange-600 bg-orange-50';
      case 'F': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Student Avatar */}
            <div className="flex-shrink-0">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-700">
                    {getInitials(student.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Student Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-600">Roll No: {student.rollNumber} • Class: {student.class}</p>
            </div>
          </div>

          {/* Exam Info */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-900">{exam.name}</h3>
            <p className="text-gray-600">{new Date(exam.date).toLocaleDateString()}</p>
            <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Overall Results Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {overallResult.totalObtained}/{overallResult.totalMarks}
          </div>
          <div className="text-sm text-gray-600">Total Marks</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold ${getPercentageColor(overallResult.percentage)}`}>
            {overallResult.percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Percentage</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold px-3 py-1 rounded-lg ${getGradeColor(overallResult.grade)}`}>
            {overallResult.grade}
          </div>
          <div className="text-sm text-gray-600">Grade</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {overallResult.gpa.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">GPA</div>
        </div>
      </div>

      {/* Position (if available) */}
      {overallResult.position && overallResult.totalStudents && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-center">
            <span className="text-lg font-semibold text-yellow-800">
              Position: {overallResult.position} out of {overallResult.totalStudents} students
            </span>
          </div>
        </div>
      )}

      {/* Subject-wise Results */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Results</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks Obtained
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject, index) => {
                const percentage = (subject.marksObtained / subject.totalMarks) * 100;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-gray-900">{subject.marksObtained}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-600">{subject.totalMarks}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className={`text-sm font-medium ${getPercentageColor(percentage)}`}>
                        {percentage.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{subject.remarks || '-'}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Comments */}
      {teacherComments && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Teacher's Comments</h4>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-800 italic">{teacherComments}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>Generated on {new Date().toLocaleDateString()}</div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-500">Print</button>
            <button className="text-blue-600 hover:text-blue-500">Download PDF</button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Compact Result Summary Card
interface ResultSummaryCardProps {
  student: {
    name: string;
    rollNumber: string;
  };
  exam: {
    name: string;
    date: string;
  };
  result: {
    percentage: number;
    grade: string;
    position?: number;
  };
  onClick?: () => void;
  className?: string;
}

export function ResultSummaryCard({
  student,
  exam,
  result,
  onClick,
  className = ''
}: ResultSummaryCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A+':
      case 'A': return 'text-green-600 bg-green-50 border-green-200';
      case 'B+':
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C+':
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'D': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'F': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card 
      className={`hover:shadow-md transition-shadow duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{exam.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {student.name} • Roll: {student.rollNumber}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(exam.date).toLocaleDateString()}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {result.percentage.toFixed(1)}%
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(result.grade)}`}>
            Grade {result.grade}
          </div>
          {result.position && (
            <div className="text-xs text-gray-500 mt-2">
              Position: {result.position}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}