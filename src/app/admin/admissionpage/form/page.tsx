// app/coming-soon/page.tsx
export const metadata = {
  title: 'Coming Soon — Madrasa',
  description: 'We are working hard. Stay tuned!',
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="px-6 py-16 text-center">
        {/* Logo / Mark */}
        <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-slate-900 text-white grid place-items-center text-lg font-semibold">
          M
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Coming Soon
        </h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          We’re preparing something great for you. Please check back later.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 text-sm text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Site status: in progress</span>
        </div>

        {/* Optional contact / CTA */}
        <div className="mt-10">
          <a
            href="mailto:info@example.com"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact us
          </a>
        </div>

        <footer className="mt-12 text-xs text-slate-400">
          © {new Date().getFullYear()} Madrasa. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
