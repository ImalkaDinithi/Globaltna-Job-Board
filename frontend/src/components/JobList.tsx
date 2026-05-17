'use client';

import { useEffect, useState } from 'react';
import { getJobs } from '@/src/services/jobService';
import JobCard from './JobCard';
import JobFilter from './JobFilter';

export interface Job {
  _id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getJobs({ category, status });
        setJobs(data);
        const unique = Array.from(new Set(data.map((j: Job) => j.category).filter(Boolean)));
        setCategories(unique as string[]);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category, status]);

  return (
    <div>
      <JobFilter categories={categories} onCategoryChange={setCategory} onStatusChange={setStatus} />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No jobs found</p>
          <p className="text-sm text-gray-500">Try clearing filters or add a new job.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
