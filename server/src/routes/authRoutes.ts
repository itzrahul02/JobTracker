import { Router } from 'express';
import { login, register, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../validators/auth';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 */
router.get('/me', authenticate, getMe);

export default router;
