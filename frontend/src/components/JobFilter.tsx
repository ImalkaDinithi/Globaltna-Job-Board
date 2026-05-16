'use client';

interface JobFilterProps {
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export default function JobFilter({
  onCategoryChange,
  onStatusChange,
}: JobFilterProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Filter by category..."
        onChange={(e) => onCategoryChange(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
