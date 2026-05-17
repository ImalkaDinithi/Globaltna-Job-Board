'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur shadow-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-100">
          TNA Job Board
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
          <Link href="/" className="hover:text-slate-500 transition-colors">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
