"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const auth_2 = require("../validators/auth");
const router = (0, express_1.Router)();
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
router.post('/register', (0, validate_1.validate)(auth_2.registerSchema), authController_1.register);
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
router.post('/login', (0, validate_1.validate)(auth_2.loginSchema), authController_1.login);
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
router.get('/me', auth_1.authenticate, authController_1.getMe);
exports.default = router;
