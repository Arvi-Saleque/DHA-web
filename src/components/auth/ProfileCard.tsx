import React from 'react';
import Card from '../ui/Card';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  avatar?: string;
  phone?: string;
  joinDate?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'pending';
  // Student specific
  studentId?: string;
  grade?: string;
  class?: string;
  // Teacher specific
  subjects?: string[];
  experience?: string;
  // Parent specific
  children?: Array<{ id: string; name: string; class: string }>;
}

interface ProfileCardProps {
  user: UserProfile;
  onEdit?: () => void;
  onViewDetails?: () => void;
  className?: string;
  compact?: boolean;
  showActions?: boolean;
}

export default function ProfileCard({
  user,
  onEdit,
  onViewDetails,
  className = '',
  compact = false,
  showActions = true
}: ProfileCardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'parent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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

  if (compact) {
    return (
      <Card className={`hover:shadow-md transition-shadow duration-200 ${className}`}>
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {getInitials(user.name)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          {/* Role Badge */}
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-1">
              {onViewDetails && (
                <button
                  onClick={onViewDetails}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="View Details"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              )}
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-medium text-gray-700">
                  {getInitials(user.name)}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
              {user.status && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-2">{user.email}</p>
            
            {user.phone && (
              <p className="text-sm text-gray-600 mb-2">{user.phone}</p>
            )}

            {/* Role-specific information */}
            {user.role === 'student' && (
              <div className="space-y-1">
                {user.studentId && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Student ID:</span> {user.studentId}
                  </p>
                )}
                {user.grade && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Grade:</span> {user.grade}
                  </p>
                )}
                {user.class && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Class:</span> {user.class}
                  </p>
                )}
              </div>
            )}

            {user.role === 'teacher' && (
              <div className="space-y-1">
                {user.subjects && user.subjects.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Subjects:</span> {user.subjects.join(', ')}
                  </p>
                )}
                {user.experience && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Experience:</span> {user.experience}
                  </p>
                )}
              </div>
            )}

            {user.role === 'parent' && user.children && user.children.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Children:</p>
                <div className="space-y-1">
                  {user.children.map(child => (
                    <p key={child.id} className="text-sm text-gray-600 ml-2">
                      • {child.name} - {child.class}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              {user.joinDate && (
                <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
              )}
              {user.lastLogin && (
                <p>Last login: {new Date(user.lastLogin).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            {onViewDetails && (
              <button
                onClick={onViewDetails}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="View Details"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Edit Profile"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}