import { Router } from 'express';
import { createJob, deleteJob, getJobById, getJobs, updateJob } from '../controllers/jobController';
import { authenticate, authorizeRoles } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createJobSchema, updateJobSchema } from '../validators/jobs';

const router = Router();

router.get('/', authenticate, getJobs);
router.get('/:id', authenticate, getJobById);
router.post('/', authenticate, authorizeRoles('ADMIN'), validate(createJobSchema), createJob);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validate(updateJobSchema), updateJob);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteJob);

export default router;
