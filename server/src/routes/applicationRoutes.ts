import { Router } from 'express';
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from '../controllers/applicationController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateApplicationSchema } from '../validators/applications';

const router = Router();

router.get('/', authenticate, getApplications);
router.get('/:id', authenticate, getApplicationById);
router.post('/', authenticate,  createApplication);
router.put('/:id', authenticate, validate(updateApplicationSchema), updateApplication);
router.delete('/:id', authenticate, deleteApplication);

export default router;
