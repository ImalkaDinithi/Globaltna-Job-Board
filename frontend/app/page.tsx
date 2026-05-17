import Link from 'next/link';
import JobBoard from '@/src/components/JobBoard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Global TNA Job Board
            </h1>
            <p className="text-lg text-gray-600">
              Post and manage job requests efficiently
            </p>
          </div>
          <Link
            href="/jobs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </section>
      <JobBoard />
    </div>
  );
}
