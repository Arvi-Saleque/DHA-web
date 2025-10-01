'use client';

interface DeleteClassButtonProps {
  classId: number;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteClassButton({ classId, deleteAction }: DeleteClassButtonProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('Are you sure you want to delete this class?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteAction} className="inline" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={classId} />
      <button
        type="submit"
        className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}