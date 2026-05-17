import Link from 'next/link';
import JobBoard from '@/src/components/JobBoard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10 lg:py-14">
      <section className="rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600 mb-4 font-semibold">
              Job board
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-100 leading-tight">
              Global TNA job requests made simple.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl">
              Post, filter, and manage technical job requests with a clean, modern interface built for teams.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/jobs/new"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      <JobBoard />
    </div>
  );
}
