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
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
