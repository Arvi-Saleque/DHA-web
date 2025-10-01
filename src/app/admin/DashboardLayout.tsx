'use client';

import { ReactNode, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: ReactNode;
}

type NavItem =
  | {
      name: string;
      href: string;
      icon: React.ReactNode;
      description?: string;
      children?: undefined;
    }
  | {
      name: string;
      href?: string; // parent can be a landing page, but optional
      icon: React.ReactNode;
      description?: string;
      children: { name: string; href: string }[];
    };

export default function AdminLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ------- NAV TREE (dropdown groups) -------
  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin',
      description: 'Overview & analytics',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
      ),
    },

    // ====== DROPDOWN GROUP: ABOUT ======
    {
      name: 'Home Management',
      href: '/admin/homepage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'Hero', href: '/admin/homepage/hero' },
        { name: 'About', href: '/admin/homepage/about' },
      ],
    },
    {
      name: 'About Management',
      href: '/admin/aboutpage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'About Us', href: '/admin/aboutpage/about' },
        { name: 'Mission & Vision', href: '/admin/aboutpage/mission' },
        { name: "Chairman’s Message", href: '/admin/aboutpage/chairman' },
        { name: 'Committee', href: '/admin/aboutpage/committee' }, // keep your current folder name
      ],
    },
    {
      name: 'Academic Management',
      href: '/admin/academicpage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'Curriculum Overview', href: '/admin/academicpage/curriculumn' },
        { name: 'Syllabus', href: '/admin/academicpage/syllabus' },
        { name: 'Class Routine', href: '/admin/academicpage/classroutine' },
        { name: 'Exam Routine', href: '/admin/academicpage/examroutine' },
        { name: 'Exam Result', href: '/admin/academicpage/examresult' },
        { name: 'Academic Calendar', href: '/admin/academicpage/academiccalender' },
        { name: 'Attendance', href: '/admin/academicpage/attendance' },
      ],
    },
    {
      name: 'Admission Management',
      href: '/admin/admissionpage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'Form', href: '/admin/admissionpage/form' },
        { name: 'Info', href: '/admin/admissionpage/info' },
        { name: 'prospectus', href: '/admin/admissionpage/propectous' },
      ],
    },
    {
      name: 'Scholarship Management',
      href: '/admin/scholarshippage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'List', href: '/admin/scholarshippage/List' },
        { name: 'Award', href: '/admin/scholarshippage/award' },
      ],
    },
    {
      name: 'News Management',
      href: '/admin/newspage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'news', href: '/admin/newspage' },
      ],
    },
    {
      name: 'Events Management',
      href: '/admin/eventspage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'events', href: '/admin/eventspage' },
      ],
    },
    {
      name: 'contact Management',
      href: '/admin/contactpage', // landing page (optional)
      description: 'Institution information',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'contact', href: '/admin/contactpage' },
      ],
    },
  ];

  // ------- OPEN STATE FOR DROPDOWNS -------
  // make the group open if current path is inside it
  const defaultOpen: Record<string, boolean> = useMemo(() => {
    const state: Record<string, boolean> = {};
    navigation.forEach((n) => {
      if ('children' in n && n.children) {
        state[n.name] = n.children.some((c) => pathname.startsWith(c.href)) || pathname === n.href;
      }
    });
    return state;
  }, [pathname]);

  const [open, setOpen] = useState<Record<string, boolean>>(defaultOpen);
  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  const current =
    navigation.find((n) =>
      'children' in n && n.children
        ? n.children.some((c) => pathname === c.href) || pathname === n.href
        : pathname === n.href
    ) ?? navigation[0];

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-sm transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-5 flex items-center border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-slate-900 text-white grid place-items-center font-semibold">M</div>
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">Madrasa</div>
              <div className="text-xs text-slate-500">Admin</div>
            </div>
          </Link>
          <button
            className="ml-auto lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3">
          <ul className="space-y-1.5">
            {navigation.map((item) => {
              const isLeaf = !('children' in item) || !item.children;
              const activeLeaf = isLeaf && pathname === (item as any).href;

              if (isLeaf) {
                return (
                  <li key={(item as any).href}>
                    <Link
                      href={(item as any).href}
                      onClick={() => setSidebarOpen(false)}
                      className={[
                        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        activeLeaf ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50',
                      ].join(' ')}
                    >
                      <span className={activeLeaf ? 'text-blue-700' : 'text-slate-600'}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              }

              const isOpen = open[item.name];
              const parentActive =
                pathname === item.href || item.children.some((c) => pathname.startsWith(c.href));

              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setOpen((s) => ({ ...s, [item.name]: !s[item.name] }))}
                    className={[
                      'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      parentActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50',
                    ].join(' ')}
                    aria-expanded={isOpen}
                    aria-controls={`section-${item.name}`}
                  >
                    <span className={parentActive ? 'text-blue-700' : 'text-slate-600'}>
                      {item.icon}
                    </span>
                    <span className="font-medium flex-1 text-left">{item.name}</span>
                    {/* caret */}
                    <svg
                      className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </button>

                  {/* children */}
                  <div
                    id={`section-${item.name}`}
                    className={`overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <ul className="mt-1 ml-8 border-l border-slate-200">
                      {item.children.map((c) => {
                        const active = pathname === c.href;
                        return (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setSidebarOpen(false)}
                              className={[
                                'flex items-center gap-2 pl-3 pr-2 py-2 text-sm rounded-md -ml-px',
                                active
                                  ? 'text-blue-700 bg-blue-50 border-l-2 border-blue-600'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                              ].join(' ')}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                              {c.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-800 p-2 rounded-md hover:bg-slate-100"
                aria-label="Open sidebar"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  {('children' in current && current.children)
                    ? current.name
                    : (current as any).name}
                </h1>
                {'description' in current && current.description && (
                  <p className="text-xs text-slate-500 mt-0.5">{current.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/" className="hidden sm:block">
                <Button
                  variant="outline"
                  size="sm"
                  icon={
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  }
                >
                  View Site
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await fetch('/api/logout', { method: 'POST' });
                  window.location.href = '/admin/login';
                }}
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                }
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
