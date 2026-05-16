const JobRequest = require('../models/JobRequest');

// Get all jobs
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Get job by ID
const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Create a job
const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;

    if (!title || !description || !company || !location || !jobType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const job = new JobRequest({
      title,
      description,
      company,
      location,
      salary,
      jobType,
    });

    await job.save();

    res.status(201).json({
      success: true,
      data: job,
      message: 'Job created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update a job
const updateJob = async (req, res, next) => {
  try {
    let job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: job,
      message: 'Job updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete a job
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    await JobRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
