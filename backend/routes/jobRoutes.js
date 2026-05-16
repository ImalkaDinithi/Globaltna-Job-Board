const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

// GET all jobs
router.get('/', getAllJobs);

// GET job by ID
router.get('/:id', getJobById);

// POST create a new job
router.post('/', createJob);

// PATCH update job status
router.patch('/:id', updateJob);

// DELETE a job
router.delete('/:id', deleteJob);

module.exports = router;
