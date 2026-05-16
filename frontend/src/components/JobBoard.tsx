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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'list'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Job Requests
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Post a Job
            </button>
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

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 text-sm mb-4">
            Post job requests and track their status through our job board
            platform.
          </p>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900">Status Types</h3>
              <ul className="text-gray-600 mt-2">
                <li>• Open - Accepting applications</li>
                <li>• In Progress - Being reviewed</li>
                <li>• Closed - No longer accepting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
