'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900">
          TNA Job Board
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-700">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
