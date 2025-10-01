import DashboardLayout from '@/app/admin/DashboardLayout';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// Server actions: Classes
async function createClass(formData: FormData) {
  'use server';
  const name = (formData.get('name') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const displayOrder = Number(formData.get('displayOrder') || 0);
  const isActive = formData.get('isActive') === 'on';

  if (!name) return;

  await prisma.curriculumClass.create({
    data: { name, description, displayOrder, isActive },
  });
  revalidatePath('/admin/academicpage/curriculumn');
  revalidatePath('/academic/curriculumn');
}

async function toggleClassActive(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const isActive = (formData.get('isActive') as string) === 'true';
  if (!id) return;

  await prisma.curriculumClass.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath('/admin/academicpage/curriculumn');
  revalidatePath('/academic/curriculumn');
}

async function deleteClass(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.curriculumClass.delete({ where: { id } });
  revalidatePath('/admin/academicpage/curriculumn');
  revalidatePath('/academic/curriculumn');
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

  await prisma.curriculumItem.create({
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
  revalidatePath('/admin/academicpage/curriculumn');
  revalidatePath('/academic/curriculumn');
}

async function deleteItem(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.curriculumItem.delete({ where: { id } });
  revalidatePath('/admin/academicpage/curriculumn');
  revalidatePath('/academic/curriculumn');
}

export default async function Page() {
  const classes = await prisma.curriculumClass.findMany({
    include: {
      curriculumItems: {
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Curriculum Management</h2>
              <p className="text-blue-100">
                Create classes and manage curriculum items (syllabus entries, PDFs, descriptions).
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <label className="block text-sm font-medium text-gray-700">Class Name</label>
              <input name="name" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., Class 1" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input name="description" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" placeholder="Short description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" name="displayOrder" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" defaultValue={classes.length} />
            </div>
            <div className="md:col-span-4 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="isActive" defaultChecked className="rounded border-gray-300" /> Active
              </label>
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Class
              </button>
            </div>
          </form>
        </div>

        {/* Classes & Items */}
        <div className="space-y-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                  <p className="text-sm text-gray-600">{cls.description || 'No description provided'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <form action={toggleClassActive}>
                    <input type="hidden" name="id" value={cls.id} />
                    <input type="hidden" name="isActive" value={String(cls.isActive)} />
                    <button className={`rounded-lg px-3 py-2 text-sm ${cls.isActive ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}>
                      {cls.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </form>
                  <form action={deleteClass}>
                    <input type="hidden" name="id" value={cls.id} />
                    <button className="rounded-lg px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
                  </form>
                </div>
              </div>

              {/* Add Item */}
              <div className="p-6">
                <h5 className="text-md font-semibold text-gray-800 mb-3">Add Item</h5>
                <form action={createItem} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input type="hidden" name="classId" value={cls.id} />
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input name="title" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., Islamic Studies" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input name="description" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" placeholder="Short description" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">PDF URL</label>
                    <input name="pdfUrl" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" placeholder="/files/syllabus.pdf" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Order</label>
                    <input type="number" name="displayOrder" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" defaultValue={cls.curriculumItems.length} />
                  </div>
                  <div className="md:col-span-5 flex items-center justify-end">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Item
                    </button>
                  </div>
                </form>
              </div>

              {/* Items Table */}
              <div className="px-6 pb-6">
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Short Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">View</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Download</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {cls.curriculumItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                          <td className="px-6 py-3 whitespace-normal text-sm text-gray-700">{item.description || '-'}</td>
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
                      {cls.curriculumItems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No items yet. Add the first one above.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-600">
              No classes created yet. Use the form above to add your first class.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}