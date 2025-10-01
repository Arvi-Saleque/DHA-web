'use client';

interface DeleteConfirmButtonProps {
  formId: string;
  className?: string;
  children: React.ReactNode;
}

export default function DeleteConfirmButton({ 
  formId, 
  className = "text-red-600 hover:text-red-900 text-xs",
  children 
}: DeleteConfirmButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
      const form = document.getElementById(formId) as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}