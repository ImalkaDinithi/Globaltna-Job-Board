"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateJobStatus } from "@/src/services/jobService";

type Status = "Open" | "In Progress" | "Closed";

interface Props {
  jobId: string;
  status: Status;
  onSuccess?: (newStatus: Status) => void;
  className?: string;
}

export default function StatusDropdown({ jobId, status, onSuccess, className = "" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (next: string) => {
    const newStatus = next as Status;
    if (newStatus === status) return;
    setLoading(true);
    try {
      await updateJobStatus(jobId, newStatus);
      toast.success("Status updated");
      onSuccess?.(newStatus);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className={`px-3 py-2 text-sm border border-slate-300 rounded-full bg-white text-slate-700 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-400 disabled:opacity-50 ${className}`}
    >
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Closed">Closed</option>
    </select>
  );
}
