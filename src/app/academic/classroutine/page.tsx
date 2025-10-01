import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClassRoutineTable from '@/components/academic/ClassRoutineTable';
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

export default async function ClassRoutinePage() {
  // Build absolute URL for server-side fetch to avoid "Failed to parse URL" errors
  const hdrs = await headers();
  const host = hdrs.get('host') || 'localhost:3000';
  const forwardedProto = hdrs.get('x-forwarded-proto');
  const protocol = forwardedProto ? forwardedProto : (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  const apiUrl = `${protocol}://${host}/api/classroutine`;

  let classes: PublicClass[] = [];
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const json = await res.json();
    classes = json?.data || [];
  } catch (err) {
    console.error('Failed fetching class routine data:', err);
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
              Class Routine
            </h1>
            <p className="mt-4 max-w-2xl text-blue-100">
              Access our comprehensive class schedules and routines to stay organized
              and never miss an important class or activity.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/20 to-transparent" aria-hidden="true" />
      </section>

      {/* Body Section */}
      <main className="b-blue max-w-7xl mx-auto px-6 py-10">
        <ClassRoutineTable classes={classes} title="Class Routine" />
      </main>
      
      <Footer />
    </div>
  );
}