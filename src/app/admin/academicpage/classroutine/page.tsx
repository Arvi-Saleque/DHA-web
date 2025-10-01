import DashboardLayout from '@/app/admin/DashboardLayout';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import DeleteConfirmButton from '@/components/DeleteConfirmButton';
import DeleteClassButton from '@/components/DeleteClassButton';

export const dynamic = 'force-dynamic';

// Server actions: Classes only
async function createClass(formData: FormData) {
  'use server';
  const name = (formData.get('name') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const displayOrder = Number(formData.get('displayOrder') || 0);
  const isActive = formData.get('isActive') === 'on';

  if (!name) return;

  await prisma.classRoutineClass.create({
    data: { name, description, displayOrder, isActive },
  });
  revalidatePath('/admin/academicpage/classroutine');
  revalidatePath('/academic/classroutine');
}

async function toggleClassActive(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const isActive = (formData.get('isActive') as string) === 'true';
  if (!id) return;

  await prisma.classRoutineClass.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath('/admin/academicpage/classroutine');
  revalidatePath('/academic/classroutine');
}

async function deleteClass(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.classRoutineClass.delete({ where: { id } });
  revalidatePath('/admin/academicpage/classroutine');
  revalidatePath('/academic/classroutine');
}

// Server actions: Items
async function createItem(formData: FormData) {
  'use server';
  const classId = Number(formData.get('classId'));
  const title = (formData.get('title') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const pdfUrl = (formData.get('pdfUrl') as string)?.trim() || null;
  const fileName = (formData.get('fileName') as string)?.trim() || null;
  const displayOrder = Number(formData.get('displayOrder') || 0);

  if (!classId || !title) return;

  await prisma.classRoutineItem.create({
    data: {
      classId,
      title,
      description,
      pdfUrl,
      fileName,
      displayOrder,
      isActive: true,
    },
  });
  revalidatePath('/admin/academicpage/classroutine');
  revalidatePath('/academic/classroutine');
}

async function deleteItem(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.classRoutineItem.delete({ where: { id } });
  revalidatePath('/admin/academicpage/classroutine');
  revalidatePath('/academic/classroutine');
}

export default async function Page() {
  const classes = await prisma.classRoutineClass.findMany({
    where: { isActive: true },
    include: {
      classRoutineItems: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Routine Management</h1>
          <p className="text-gray-600">
            Manage class routine schedules and timetables for different classes.
          </p>
        </div>

        {/* Add New Class */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Class</h2>
          <form action={createClass} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g., Class 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Short description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  id="displayOrder"
                  name="displayOrder"
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Class
            </button>
          </form>
        </div>

        {/* Existing Classes */}
        <div className="space-y-6">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                  {classItem.description && (
                    <p className="text-gray-600 text-sm">{classItem.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <form action={toggleClassActive} className="inline">
                    <input type="hidden" name="id" value={classItem.id} />
                    <input type="hidden" name="isActive" value={classItem.isActive.toString()} />
                    <button
                      type="submit"
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        classItem.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {classItem.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </form>
                  <DeleteClassButton
                    classId={classItem.id}
                    className={classItem.name}
                    deleteAction={deleteClass}
                  />
                </div>
              </div>

              {/* Add Item Form */}
              <div className="border-t pt-4 mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Add Routine Item</h4>
                <form action={createItem} className="space-y-3">
                  <input type="hidden" name="classId" value={classItem.id} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g., Monday Schedule"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        placeholder="Optional description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PDF URL
                      </label>
                      <input
                        type="url"
                        name="pdfUrl"
                        placeholder="https://example.com/routine.pdf"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        File Name
                      </label>
                      <input
                        type="text"
                        name="fileName"
                        placeholder="routine.pdf"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                  >
                    Add Item
                  </button>
                </form>
              </div>

              {/* Items Table */}
              {classItem.classRoutineItems.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Routine Items</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            View
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Download
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {classItem.classRoutineItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.description || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.pdfUrl ? (
                                <a
                                  href={item.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View
                                </a>
                              ) : (
                                <span className="text-gray-400">No PDF</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.pdfUrl ? (
                                <a
                                  href={item.pdfUrl}
                                  download={item.fileName || 'routine.pdf'}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Download
                                </a>
                              ) : (
                                <span className="text-gray-400">No PDF</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <form action={deleteItem} className="inline" id={`delete-item-form-${item.id}`}>
                                <input type="hidden" name="id" value={item.id} />
                                <DeleteConfirmButton formId={`delete-item-form-${item.id}`}>
                                  Delete
                                </DeleteConfirmButton>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {classes.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No classes found. Create your first class to get started.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
