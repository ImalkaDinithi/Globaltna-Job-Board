'use client';

import { useState } from 'react';
import JobList from './JobList';
import JobForm from './JobForm';

export default function JobBoard() {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [refresh, setRefresh] = useState(false);

  const handleJobCreated = () => {
    setRefresh(!refresh);
    setActiveTab('list');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
      <div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 bg-slate-50 border-b border-slate-200">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600 font-semibold mb-1">
                Job board
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Job requests & posting
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('list')}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === 'list'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Job Requests
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === 'create'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Post a Job
              </button>
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'list' ? (
              <JobList key={refresh.toString()} />
            ) : (
              <JobForm onSuccess={handleJobCreated} />
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">About</h2>
          <p className="text-slate-600 leading-7">
            Post job requests and track their status through our job board platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Status types</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="rounded-2xl bg-slate-50 p-4">Open — accepting applications</li>
            <li className="rounded-2xl bg-slate-50 p-4">In Progress — being reviewed</li>
            <li className="rounded-2xl bg-slate-50 p-4">Closed — no longer accepting</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
