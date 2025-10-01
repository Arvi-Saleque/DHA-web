import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'News & Updates - Madrasa Management System',
  description: 'Stay updated with the latest news, announcements, and events from our institution.',
};

export const dynamic = 'force-dynamic';

interface SearchParams {
  category?: string;
  page?: string;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const selectedCategory = resolvedSearchParams.category;
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  // Fetch categories
  const categories = await prisma.newsCategory.findMany({
    where: { isActive: true },
    include: {
      newsItems: {
        where: { 
          isActive: true,
          isPublished: true 
        },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  // Build where clause for news items
  const whereClause: any = {
    isActive: true,
    isPublished: true,
  };

  if (selectedCategory) {
    whereClause.category = {
      name: selectedCategory,
    };
  }

  // Fetch news items with pagination
  const [newsItems, totalCount] = await Promise.all([
    prisma.newsItem.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { publishedAt: 'desc' },
      ],
      skip,
      take: itemsPerPage,
    }),
    prisma.newsItem.count({
      where: whereClause,
    }),
  ]);

  // Get featured news (top 3)
  const featuredNews = await prisma.newsItem.findMany({
    where: {
      isActive: true,
      isPublished: true,
      isFeatured: true,
    },
    include: {
      category: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest news, announcements, and events from our institution
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {item.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${item.category.color}-100 text-${item.category.color}-800`}>
                          {item.category.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        {item.author && <span>By {item.author}</span>}
                        <span>{new Date(item.publishedAt!).toLocaleDateString()}</span>
                      </div>
                      <span>{item.viewCount} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/news"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All News
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/news?category=${encodeURIComponent(category.name)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? `bg-${category.color}-600 text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name} ({category.newsItems.length})
              </Link>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory} News` : 'All News'}
            </h2>
            <p className="text-gray-600">
              {totalCount} article{totalCount !== 1 ? 's' : ''} found
            </p>
          </div>

          {newsItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No news articles found</h3>
              <p className="text-gray-600">
                {selectedCategory 
                  ? `No articles found in the "${selectedCategory}" category.`
                  : 'No news articles have been published yet.'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {newsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {item.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${item.category.color}-100 text-${item.category.color}-800`}>
                            {item.category.name}
                          </span>
                        </div>
                        {item.isFeatured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          {item.author && <span>By {item.author}</span>}
                          <span>{new Date(item.publishedAt!).toLocaleDateString()}</span>
                        </div>
                        <span>{item.viewCount} views</span>
                      </div>
                      {item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              +{item.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/news?${new URLSearchParams({
                        ...(selectedCategory && { category: selectedCategory }),
                        page: (currentPage - 1).toString(),
                      })}`}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/news?${new URLSearchParams({
                        ...(selectedCategory && { category: selectedCategory }),
                        page: page.toString(),
                      })}`}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  
                  {currentPage < totalPages && (
                    <Link
                      href={`/news?${new URLSearchParams({
                        ...(selectedCategory && { category: selectedCategory }),
                        page: (currentPage + 1).toString(),
                      })}`}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}