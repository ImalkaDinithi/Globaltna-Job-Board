'use client';

interface JobFilterProps {
  categories?: string[];
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export default function JobFilter({
  categories = [],
  onCategoryChange,
  onStatusChange,
}: JobFilterProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full lg:w-1/2 px-4 py-3 border border-slate-300 rounded-3xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
