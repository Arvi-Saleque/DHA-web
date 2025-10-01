import DashboardLayout from '@/app/admin/DashboardLayout';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
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

  await prisma.syllabusClass.create({
    data: { name, description, displayOrder, isActive },
  });
  revalidatePath('/admin/academicpage/syllabus');
  revalidatePath('/academic/syllabus');
}

async function toggleClassActive(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const isActive = (formData.get('isActive') as string) === 'true';
  if (!id) return;

  await prisma.syllabusClass.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath('/admin/academicpage/syllabus');
  revalidatePath('/academic/syllabus');
}

async function deleteClass(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.syllabusClass.delete({ where: { id } });
  revalidatePath('/admin/academicpage/syllabus');
  revalidatePath('/academic/syllabus');
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

  await prisma.syllabusItem.create({
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
  revalidatePath('/admin/academicpage/syllabus');
  revalidatePath('/academic/syllabus');
}

async function deleteItem(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.syllabusItem.delete({ where: { id } });
  revalidatePath('/admin/academicpage/syllabus');
  revalidatePath('/academic/syllabus');
}

export default async function Page() {
  const classes = await prisma.syllabusClass.findMany({
    where: { isActive: true },
    include: {
      syllabusItems: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Syllabus Management</h2>
              <p className="text-indigo-100">
                Create classes and manage syllabus items (syllabus entries, PDFs, descriptions).
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m5 5H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v12a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Create Class */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Add New Class</h3>
          </div>
          <form action={createClass} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Class Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g., Class 1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Short description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                id="displayOrder"
                defaultValue={classes.length + 1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-4 flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
              >
                + Create Class
              </button>
            </div>
          </form>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{cls.name}</h3>
                  <p className="text-sm text-gray-600">{cls.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <form action={toggleClassActive} className="inline">
                    <input type="hidden" name="id" value={cls.id} />
                    <input type="hidden" name="isActive" value={cls.isActive.toString()} />
                    <button
                      type="submit"
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        cls.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cls.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </form>
                  <DeleteClassButton classId={cls.id} deleteAction={deleteClass} />
                </div>
              </div>

              {/* Add Item Form */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h4 className="text-md font-medium text-gray-700 mb-3">Add Item to {cls.name}</h4>
                <form action={createItem} className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <input type="hidden" name="classId" value={cls.id} />
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="title"
                      placeholder="Item title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      name="pdfUrl"
                      placeholder="PDF URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <button
                      type="submit"
                      className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                    >
                      Add Item
                    </button>
                  </div>
                </form>
              </div>

              {/* Items List */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cls.syllabusItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{item.description || '-'}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                          {item.pdfUrl ? (
                            <a href={item.pdfUrl} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </a>
                          ) : (
                            <span className="text-xs text-gray-500">No PDF</span>
                          )}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                          {item.pdfUrl ? (
                            <a href={item.pdfUrl} download className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-3 py-1.5 text-sm hover:bg-gray-800">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                              </svg>
                              Download
                            </a>
                          ) : (
                            <span className="text-xs text-gray-500">No PDF</span>
                          )}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                          <form action={deleteItem}>
                            <input type="hidden" name="id" value={item.id} />
                            <button className="rounded-lg px-3 py-1.5 text-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    {cls.syllabusItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No items yet. Add the first one above.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
              <p className="text-gray-500">Create your first syllabus class to get started.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
