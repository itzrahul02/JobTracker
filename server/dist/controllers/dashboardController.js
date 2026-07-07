"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateDashboard = exports.getAdminDashboard = void 0;
const db_1 = require("../config/db");
const getAdminDashboard = async (_req, res) => {
    try {
        const users = await (0, db_1.getCollection)('users');
        const jobs = await (0, db_1.getCollection)('jobs');
        const applications = await (0, db_1.getCollection)('applications');
        const [userCount, jobCount, applicationCount, offerCount, interviewCount, recentJobs, recentCandidates] = await Promise.all([
            users.countDocuments(),
            jobs.countDocuments(),
            applications.countDocuments(),
            applications.countDocuments({ status: 'Offer' }),
            applications.countDocuments({ status: 'Interview' }),
            jobs.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
            users.find({ role: 'CANDIDATE' }).sort({ createdAt: -1 }).limit(5).project({ password: 0 }).toArray(),
        ]);
        return res.json({
            totals: {
                users: userCount,
                jobs: jobCount,
                applications: applicationCount,
                offers: offerCount,
                interviews: interviewCount,
            },
            recentJobs,
            recentCandidates,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to load admin dashboard' });
    }
};
exports.getAdminDashboard = getAdminDashboard;
const getCandidateDashboard = async (req, res) => {
    try {
        const applications = await (0, db_1.getCollection)('applications');
        const [total, applied, interview, offer, rejected] = await Promise.all([
            applications.countDocuments({ candidateId: req.user.id }),
            applications.countDocuments({ candidateId: req.user.id, status: 'Applied' }),
            applications.countDocuments({ candidateId: req.user.id, status: 'Interview' }),
            applications.countDocuments({ candidateId: req.user.id, status: 'Offer' }),
            applications.countDocuments({ candidateId: req.user.id, status: 'Rejected' }),
        ]);
        return res.json({ stats: { total, applied, interview, offer, rejected } });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to load candidate dashboard' });
    }
};
exports.getCandidateDashboard = getCandidateDashboard;
