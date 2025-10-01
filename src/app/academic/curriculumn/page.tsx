import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

type PublicClass = {
  id: number;
  name: string;
  description?: string | null;
  items: {
    id: number;
    title: string;
    description?: string | null;
    pdfUrl?: string | null;
    fileName?: string | null;
    fileSize?: number | null;
    hasPreview: boolean;
    hasPdf: boolean;
  }[];
};

export default async function CurriculumPage() {
  // Build absolute URL for server-side fetch to avoid "Failed to parse URL" errors
  const hdrs = headers();
  const host = hdrs.get('host') || 'localhost:3000';
  const forwardedProto = hdrs.get('x-forwarded-proto');
  const protocol = forwardedProto ? forwardedProto : (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  const apiUrl = `${protocol}://${host}/api/curriculum`;

  let classes: PublicClass[] = [];
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const json = await res.json();
    classes = json?.data || [];
  } catch (err) {
    console.error('Failed fetching curriculum data:', err);
    classes = [];
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow">
              Curriculum Overview
            </h1>
            <p className="mt-4 max-w-2xl text-blue-100">
              Explore our structured classes and download syllabi to stay aligned with
              academic goals and learning outcomes.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/20 to-transparent" aria-hidden="true" />
      </section>

      {/* Body Section */}
      <main className="b-blue max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Curriculum Classes</h2>
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
                    <td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">No classes available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}