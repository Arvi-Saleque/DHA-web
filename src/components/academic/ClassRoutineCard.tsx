import React from 'react';
import Link from 'next/link';

interface ClassRoutineItem {
  id: number;
  title: string;
  description?: string | null;
  pdfUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  hasPreview: boolean;
  hasPdf: boolean;
}

interface ClassRoutineClass {
  id: number;
  name: string;
  description?: string | null;
  items: ClassRoutineItem[];
}

interface ClassRoutineCardProps {
  classData: ClassRoutineClass;
  className?: string;
}

export default function ClassRoutineCard({ 
  classData, 
  className = "" 
}: ClassRoutineCardProps) {
  const firstItem = classData.items?.[0];
  const hasPdf = !!firstItem?.pdfUrl;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {classData.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {classData.description || firstItem?.description || 'No description available'}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {classData.items.length} item{classData.items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* File Information */}
      {firstItem && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {firstItem.fileName || firstItem.title}
                </p>
                {firstItem.fileSize && (
                  <p className="text-xs text-gray-500">
                    {(firstItem.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            {hasPdf && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                PDF Available
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {hasPdf ? (
          <>
            <Link
              href={firstItem!.pdfUrl!}
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </Link>
            <a
              href={firstItem!.pdfUrl!}
              download
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              Download
            </a>
          </>
        ) : (
          <div className="flex-1 text-center py-2 text-sm text-gray-500">
            No PDF available
          </div>
        )}
      </div>
    </div>
  );
}