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

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getJobs({ category, status });
        setJobs(data);
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
      <JobFilter onCategoryChange={setCategory} onStatusChange={setStatus} />

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
