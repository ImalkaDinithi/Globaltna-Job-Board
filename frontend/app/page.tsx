import JobBoard from '@/src/components/JobBoard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Global TNA Job Board
        </h1>
        <p className="text-lg text-gray-600">
          Post and manage job requests efficiently
        </p>
      </section>
      <JobBoard />
    </div>
  );
}
