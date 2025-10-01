import DashboardLayout from '@/app/admin/DashboardLayout';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import DeleteConfirmButton from '@/components/DeleteConfirmButton';

export const dynamic = 'force-dynamic';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Server actions: Categories
async function createCategory(formData: FormData) {
  'use server';
  const name = (formData.get('name') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const color = (formData.get('color') as string)?.trim() || 'blue';
  const displayOrder = Number(formData.get('displayOrder') || 0);

  if (!name) return;

  await prisma.newsCategory.create({
    data: { name, description, color, displayOrder, isActive: true },
  });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

async function toggleCategoryActive(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const isActive = (formData.get('isActive') as string) === 'true';
  if (!id) return;

  await prisma.newsCategory.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

async function deleteCategory(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.newsCategory.delete({ where: { id } });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

// Server actions: News Items
async function createNewsItem(formData: FormData) {
  'use server';
  const categoryId = Number(formData.get('categoryId'));
  const title = (formData.get('title') as string)?.trim();
  const excerpt = (formData.get('excerpt') as string)?.trim() || null;
  const content = (formData.get('content') as string)?.trim();
  const featuredImage = (formData.get('featuredImage') as string)?.trim() || null;
  const author = (formData.get('author') as string)?.trim() || null;
  const tags = (formData.get('tags') as string)?.trim().split(',').map(tag => tag.trim()).filter(Boolean) || [];
  const isPublished = formData.get('isPublished') === 'on';
  const isFeatured = formData.get('isFeatured') === 'on';
  const metaTitle = (formData.get('metaTitle') as string)?.trim() || null;
  const metaDescription = (formData.get('metaDescription') as string)?.trim() || null;

  if (!categoryId || !title || !content) return;

  const slug = generateSlug(title);
  const publishedAt = isPublished ? new Date() : null;

  await prisma.newsItem.create({
    data: {
      categoryId,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      tags,
      isPublished,
      isFeatured,
      publishedAt,
      metaTitle,
      metaDescription,
      isActive: true,
    },
  });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

async function toggleNewsPublished(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const isPublished = (formData.get('isPublished') as string) === 'true';
  if (!id) return;

  const publishedAt = !isPublished ? new Date() : null;

  await prisma.newsItem.update({
    where: { id },
    data: { 
      isPublished: !isPublished,
      publishedAt 
    },
  });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

async function deleteNewsItem(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (!id) return;
  await prisma.newsItem.delete({ where: { id } });
  revalidatePath('/admin/newspage');
  revalidatePath('/news');
}

export default async function NewsManagementPage() {
  const [categories, newsItems] = await Promise.all([
    prisma.newsCategory.findMany({
      where: { isActive: true },
      include: {
        newsItems: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.newsItem.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">News Management</h2>
              <p className="text-purple-100">
                Create categories and manage news articles, announcements, and updates.
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Create Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Add New Category</h3>
          </div>
          <form action={createCategory} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g., Academic News"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <select
                name="color"
                id="color"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="indigo">Indigo</option>
              </select>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">News Categories</h3>
          </div>
          <div className="p-6">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No categories created yet.</p>
            ) : (
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          {category.description && (
                            <p className="text-sm text-gray-600">{category.description}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            {category.newsItems.length} news item{category.newsItems.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <form action={toggleCategoryActive} className="inline">
                          <input type="hidden" name="id" value={category.id} />
                          <input type="hidden" name="isActive" value={category.isActive.toString()} />
                          <button
                            type="submit"
                            className={`px-3 py-1 text-xs rounded-full ${
                              category.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {category.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </form>
                        <form action={deleteCategory} id={`delete-category-form-${category.id}`} className="inline">
                          <input type="hidden" name="id" value={category.id} />
                        </form>
                        <DeleteConfirmButton
                          formId={`delete-category-form-${category.id}`}
                          itemName={category.name}
                          itemType="category"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create News Item */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Add News Article</h3>
          </div>
          <form action={createNewsItem} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="News article title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Short Summary)
              </label>
              <textarea
                name="excerpt"
                id="excerpt"
                rows={2}
                placeholder="Brief summary of the news article"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                rows={8}
                placeholder="Full news article content"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  id="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="education, announcement, academic"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  id="metaTitle"
                  placeholder="SEO optimized title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Meta Description
                </label>
                <input
                  type="text"
                  name="metaDescription"
                  id="metaDescription"
                  placeholder="SEO meta description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                  Publish immediately
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                  Featured article
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create News Article
              </button>
            </div>
          </form>
        </div>

        {/* News Items List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">News Articles</h3>
          </div>
          <div className="p-6">
            {newsItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No news articles created yet.</p>
            ) : (
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full bg-${item.category.color}-100 text-${item.category.color}-800`}>
                            {item.category.name}
                          </span>
                          {item.isFeatured && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        {item.excerpt && (
                          <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {item.author && <span>By {item.author}</span>}
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          <span>{item.viewCount} views</span>
                          {item.tags.length > 0 && (
                            <span>Tags: {item.tags.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <form action={toggleNewsPublished} className="inline">
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="isPublished" value={item.isPublished.toString()} />
                          <button
                            type="submit"
                            className={`px-3 py-1 text-xs rounded-full ${
                              item.isPublished
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {item.isPublished ? 'Unpublish' : 'Publish'}
                          </button>
                        </form>
                        <form action={deleteNewsItem} id={`delete-news-form-${item.id}`} className="inline">
                          <input type="hidden" name="id" value={item.id} />
                        </form>
                        <DeleteConfirmButton
                          formId={`delete-news-form-${item.id}`}
                          itemName={item.title}
                          itemType="news article"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
