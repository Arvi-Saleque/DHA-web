import React, { useRef } from 'react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  dragAndDrop?: boolean;
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export default function FileUpload({
  label,
  accept,
  multiple = false,
  onChange,
  disabled = false,
  error,
  className = '',
  dragAndDrop = true,
  maxSize,
  allowedTypes
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string>('');

  const validateFiles = (files: FileList): boolean => {
    setUploadError('');
    
    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize * 1024 * 1024) {
          setUploadError(`File size must be less than ${maxSize}MB`);
          return false;
        }
      }
    }

    if (allowedTypes) {
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.includes(files[i].type)) {
          setUploadError(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && validateFiles(files)) {
      onChange(files);
    } else {
      onChange(null);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = event.dataTransfer.files;
    if (files && validateFiles(files)) {
      onChange(files);
    } else {
      onChange(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const displayError = error || uploadError;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div
        onClick={handleClick}
        onDrop={dragAndDrop ? handleDrop : undefined}
        onDragOver={dragAndDrop ? handleDragOver : undefined}
        onDragLeave={dragAndDrop ? handleDragLeave : undefined}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 hover:bg-gray-50'}
          ${displayError ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        
        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="text-sm text-gray-600">
            {dragAndDrop ? (
              <>
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </>
            ) : (
              <span className="font-medium text-blue-600">Click to upload</span>
            )}
          </div>
          
          {accept && (
            <p className="text-xs text-gray-500">
              Supported formats: {accept}
            </p>
          )}
          
          {maxSize && (
            <p className="text-xs text-gray-500">
              Maximum file size: {maxSize}MB
            </p>
          )}
        </div>
      </div>
      
      {displayError && (
        <p className="text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}