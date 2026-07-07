"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/admin', auth_1.authenticate, (0, auth_1.authorizeRoles)('ADMIN'), dashboardController_1.getAdminDashboard);
router.get('/candidate', auth_1.authenticate, (0, auth_1.authorizeRoles)('CANDIDATE'), dashboardController_1.getCandidateDashboard);
exports.default = router;
