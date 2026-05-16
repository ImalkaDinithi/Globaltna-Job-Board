'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TNA Job Board
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Jobs
          </Link>
        </nav>
      </div>
    </header>
  );
}
