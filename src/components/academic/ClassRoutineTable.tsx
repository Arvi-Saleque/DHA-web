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

interface ClassRoutineTableProps {
  classes: ClassRoutineClass[];
  title?: string;
  className?: string;
}

export default function ClassRoutineTable({ 
  classes, 
  title = "Class Routine",
  className = "" 
}: ClassRoutineTableProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">{classes.length} classes</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Class Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Short Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                View
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {classes.map((cls) => {
              const firstItem = cls.items?.[0];
              const hasPdf = !!firstItem?.pdfUrl;
              return (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cls.name}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {cls.description || firstItem?.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {hasPdf ? (
                      <Link
                        href={firstItem!.pdfUrl!}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-500">No PDF</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {hasPdf ? (
                      <a
                        href={firstItem!.pdfUrl!}
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-3 py-2 text-sm hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500">No PDF</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {classes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">
                  No class routines available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}