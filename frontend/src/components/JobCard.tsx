'use client';

import Link from 'next/link';
import { Job } from './JobList';
import StatusBadge from './StatusBadge';
import StatusDropdown from './StatusDropdown';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <article className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-200">
        <div>
          <p className="text-xs text-slate-500">
            {formatDate(job.createdAt)}
          </p>
          <Link
            href={`/jobs/${job._id}`}
            className="text-sky-600 text-sm font-medium hover:text-sky-700 transition-colors"
          >
            View details
          </Link>
        </div>

        <StatusDropdown
          jobId={job._id}
          status={job.status}
          className="bg-white"
          onSuccess={() => window.location.reload()}
        />
      </div>
    </article>
  );
}