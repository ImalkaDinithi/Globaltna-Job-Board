'use client';

import { useRouter } from 'next/navigation';
import JobForm from '@/src/components/JobForm';

export default function NewJobPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-10 lg:py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-semibold mb-4">
              New posting
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 mb-3">
              Post a new job request
            </h1>
            <p className="text-slate-600 leading-7">
              Share the job details and contact information needed for your team to move forward.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <JobForm onSuccess={handleSuccess} />
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tips for a better job post</h3>
          <ul className="space-y-3 text-slate-600">
            <li>• Add context and describe the expected outcome.</li>
            <li>• Keep the location and category clear.</li>
            <li>• Provide accurate contact details for follow-up.</li>
            <li>• Keep descriptions concise and structured.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
