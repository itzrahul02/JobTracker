import { Router } from 'express';
import { getUsers, getUserById, updateProfile } from '../controllers/userController';
import { authenticate, authorizeRoles } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { profileSchema } from '../validators/auth';

const router = Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getUsers);
router.get('/:id', authenticate, authorizeRoles('ADMIN'), getUserById);
router.put('/profile', authenticate, validate(profileSchema), updateProfile);

export default router;
