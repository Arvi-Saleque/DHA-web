import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'academic' | 'fee' | 'event' | 'holiday' | 'examination';
  isRead?: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface NoticeBoardWidgetProps {
  notices: NoticeItem[];
  maxItems?: number;
  onViewAll?: () => void;
  onNoticeClick?: (notice: NoticeItem) => void;
  className?: string;
  showCategories?: boolean;
}

export default function NoticeBoardWidget({
  notices,
  maxItems = 5,
  onViewAll,
  onNoticeClick,
  className = '',
  showCategories = true
}: NoticeBoardWidgetProps) {
  const displayedNotices = notices.slice(0, maxItems);

  const getPriorityColor = (priority: NoticeItem['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: NoticeItem['category']) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'fee': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'holiday': return 'bg-yellow-100 text-yellow-800';
      case 'examination': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h1a3 3 0 003-3V8a3 3 0 00-3-3H4m0 12V4m0 15H2v-4h2v4z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900">Notice Board</h2>
        </div>
        
        {onViewAll && (
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {displayedNotices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h1a3 3 0 003-3V8a3 3 0 00-3-3H4m0 12V4m0 15H2v-4h2v4z" />
            </svg>
            <p>No notices available</p>
          </div>
        ) : (
          displayedNotices.map((notice) => (
            <div
              key={notice.id}
              className={`
                border rounded-lg p-4 transition-all duration-200
                ${onNoticeClick ? 'hover:shadow-md cursor-pointer hover:border-blue-300' : ''}
                ${!notice.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
              `}
              onClick={() => onNoticeClick?.(notice)}
            >
              {/* Notice Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${!notice.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                    {notice.title}
                    {!notice.isRead && (
                      <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                    )}
                  </h3>
                  
                  {/* Badges */}
                  <div className="flex items-center space-x-2 mt-2">
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                      {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                    </span>
                    
                    {/* Category Badge */}
                    {showCategories && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                        {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Date */}
                <div className="text-right text-sm text-gray-500">
                  <div>{formatDate(notice.date)}</div>
                  <div className="text-xs">by {notice.author}</div>
                </div>
              </div>

              {/* Notice Content */}
              <div className="text-gray-700 text-sm mb-3">
                {truncateContent(notice.content)}
              </div>

              {/* Attachments */}
              {notice.attachments && notice.attachments.length > 0 && (
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-xs text-gray-600">
                    {notice.attachments.length} attachment{notice.attachments.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Read More Indicator */}
              {onNoticeClick && notice.content.length > 150 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-sm text-blue-600 hover:text-blue-500">
                    Read more →
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notices.length > maxItems && (
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <span className="text-sm text-gray-600">
            Showing {displayedNotices.length} of {notices.length} notices
          </span>
          {onViewAll && (
            <Button variant="outline" size="sm" onClick={onViewAll} className="ml-3">
              View All {notices.length} Notices
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

// Individual Notice Card Component
interface NoticeCardProps {
  notice: NoticeItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkAsRead?: () => void;
  expanded?: boolean;
  className?: string;
}

export function NoticeCard({
  notice,
  onEdit,
  onDelete,
  onMarkAsRead,
  expanded = false,
  className = ''
}: NoticeCardProps) {
  const getPriorityColor = (priority: NoticeItem['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={`${!notice.isRead ? 'ring-2 ring-blue-200' : ''} ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {notice.title}
            {!notice.isRead && (
              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
            )}
          </h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>By {notice.author}</span>
            <span>•</span>
            <span>{new Date(notice.date).toLocaleDateString()}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
              {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
            </span>
          </div>
        </div>
        
        {(onEdit || onDelete || onMarkAsRead) && (
          <div className="flex space-x-2">
            {!notice.isRead && onMarkAsRead && (
              <Button size="sm" variant="outline" onClick={onMarkAsRead}>
                Mark as Read
              </Button>
            )}
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

      <div className="prose prose-sm max-w-none mb-4">
        {expanded ? notice.content : notice.content.substring(0, 300) + (notice.content.length > 300 ? '...' : '')}
      </div>

      {notice.attachments && notice.attachments.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
          <div className="space-y-2">
            {notice.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm text-gray-700">{attachment.name}</span>
                <span className="text-xs text-gray-500">({attachment.type})</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}