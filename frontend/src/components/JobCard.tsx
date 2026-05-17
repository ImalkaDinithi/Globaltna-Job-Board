'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Job } from './JobList';
import StatusBadge from './StatusBadge';
import { updateJobStatus } from '@/src/services/jobService';
import toast from 'react-hot-toast';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);

    try {
      await updateJobStatus(job._id, newStatus);
      toast.success('Status updated successfully');

      // refresh page
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-4">
          <Link href={`/jobs/${job._id}`} className="no-underline">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
          </Link>

          {job.category && (
            <p className="text-sm text-gray-500 mt-1">
              {job.category}
            </p>
          )}
        </div>

        <StatusBadge status={job.status} />
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {job.location && (
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium">{job.location}</p>
          </div>
        )}

        {job.contactName && (
          <div>
            <p className="text-gray-600">Contact</p>
            <p className="font-medium">{job.contactName}</p>
          </div>
        )}
      </div>

      {/* Email */}
      {job.contactEmail && (
        <p className="text-sm text-blue-600 mb-4">
          <a href={`mailto:${job.contactEmail}`}>
            {job.contactEmail}
          </a>
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">
            {formatDate(job.createdAt)}
          </p>

          <Link
            href={`/jobs/${job._id}`}
            className="text-blue-600 text-sm font-medium mt-1"
          >
            View details
          </Link>
        </div>

        {/* Status Dropdown */}
        <select
          value={job.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:border-gray-400 disabled:opacity-50"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </article>
  );
}