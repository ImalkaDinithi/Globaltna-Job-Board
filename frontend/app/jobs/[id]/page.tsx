'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById, deleteJob } from '@/src/services/jobService';
import StatusBadge from '@/src/components/StatusBadge';
import StatusDropdown from '@/src/components/StatusDropdown';
import toast from 'react-hot-toast';

interface Job {
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

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string | undefined;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        toast.error('Invalid job ID');
        router.push('/');
        return;
      }

      try {
        setLoading(true);
        const data = await getJobById(jobId);
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
        toast.error('Failed to load job details');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, router]);

  const handleStatusChange = (newStatus: string) => {
    setJob((prev) => (prev ? { ...prev, status: newStatus as Job['status'] } : null));
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      setUpdating(true);
      await deleteJob(jobId!);
      toast.success('Job deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to delete job');
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-slate-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Job not found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to job board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
        >
          ← Back to Job Board
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              {job.category && (
                <p className="text-lg text-gray-600 mb-4">{job.category}</p>
              )}
            </div>
            <StatusBadge status={job.status} />
          </div>

          <div className="prose prose-sm max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-slate-50 rounded-3xl">
            {job.location && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Location</p>
                <p className="text-lg text-gray-900">{job.location}</p>
              </div>
            )}
            {job.contactName && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Contact Person</p>
                <p className="text-lg text-gray-900">{job.contactName}</p>
              </div>
            )}
            {job.contactEmail && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {job.contactEmail}
                </a>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Posted</p>
              <p className="text-lg text-gray-900">{formatDate(job.createdAt)}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Job status</h3>
                <p className="text-sm text-slate-600">Update the current progress state for this posting.</p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <StatusDropdown jobId={job._id} status={job.status} onSuccess={handleStatusChange} className="bg-white" />
                <button
                  onClick={handleDelete}
                  disabled={updating}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full disabled:opacity-50 transition-colors"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
