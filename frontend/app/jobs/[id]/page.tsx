'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById, updateJobStatus, deleteJob } from '@/src/services/jobService';
import StatusBadge from '@/src/components/StatusBadge';
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
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
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

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await updateJobStatus(jobId, newStatus);
      setJob((prev) => (prev ? { ...prev, status: newStatus as Job['status'] } : null));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      setUpdating(true);
      await deleteJob(jobId);
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
          <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600">Loading job details...</p>
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
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Job Board
      </Link>

      <div className="max-w-3xl mx-auto">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
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

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Status</h3>
            <div className="flex gap-3 items-center">
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <button
                onClick={handleDelete}
                disabled={updating}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 transition-colors"
              >
                Delete Job
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
