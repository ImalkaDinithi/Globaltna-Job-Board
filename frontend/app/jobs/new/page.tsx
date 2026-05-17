'use client';

import { useRouter } from 'next/navigation';
import JobForm from '@/src/components/JobForm';

export default function NewJobPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to post a job request on the job board
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <JobForm onSuccess={handleSuccess} />
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Tips for a great job posting:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be clear and specific about the job requirements</li>
            <li>• Include relevant details like location and timeline</li>
            <li>• Provide accurate contact information</li>
            <li>• Update the status as applications come in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
