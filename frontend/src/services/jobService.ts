import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateJobData {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
}

export interface JobFilters {
  category?: string;
  status?: string;
}

// Get all jobs with optional filters
export const getJobs = async (filters?: JobFilters) => {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);

    const response = await apiClient.get('/jobs', { params });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Get a single job by ID
export const getJobById = async (id: string) => {
  try {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

// Create a new job
export const createJob = async (data: CreateJobData) => {
  try {
    const response = await apiClient.post('/jobs', data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Update job status
export const updateJobStatus = async (id: string, status: string) => {
  try {
    const response = await apiClient.patch(`/jobs/${id}`, { status });
    return response.data.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id: string) => {
  try {
    await apiClient.delete(`/jobs/${id}`);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};
