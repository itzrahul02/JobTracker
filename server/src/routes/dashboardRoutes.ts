import { Router } from 'express';
import { getAdminDashboard, getCandidateDashboard } from '../controllers/dashboardController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/admin', authenticate, authorizeRoles('ADMIN'), getAdminDashboard);
router.get('/candidate', authenticate, authorizeRoles('CANDIDATE'), getCandidateDashboard);

export default router;
