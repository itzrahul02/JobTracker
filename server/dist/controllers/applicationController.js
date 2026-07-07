"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getApplicationById = exports.getApplications = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../config/db");
const getApplications = async (req, res) => {
    try {
        const applications = await (0, db_1.getCollection)('applications');
        const jobs = await (0, db_1.getCollection)('jobs');
        const users = await (0, db_1.getCollection)('users');
        const queryFilter = req.user?.role === 'ADMIN' ? {} : { candidateId: req.user.id };
        const result = await applications.find(queryFilter).sort({ createdAt: -1 }).toArray();
        const populated = await Promise.all(result.map(async (app) => {
            const job = await jobs.findOne({ id: app.jobId });
            const candidate = await users.findOne({ id: app.candidateId });
            return { ...app, title: job?.title, company: job?.company, candidate_name: candidate?.name };
        }));
        return res.json(populated);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch applications' });
    }
};
exports.getApplications = getApplications;
const getApplicationById = async (req, res) => {
    try {
        const applications = await (0, db_1.getCollection)('applications');
        const app = await applications.findOne({ id: req.params.id });
        if (!app)
            return res.status(404).json({ message: 'Application not found' });
        if (req.user?.role !== 'ADMIN' && app.candidateId !== req.user?.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const jobs = await (0, db_1.getCollection)('jobs');
        const users = await (0, db_1.getCollection)('users');
        const job = await jobs.findOne({ id: app.jobId });
        const candidate = await users.findOne({ id: app.candidateId });
        return res.json({ ...app, title: job?.title, company: job?.company, candidate_name: candidate?.name });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch application' });
    }
};
exports.getApplicationById = getApplicationById;
const createApplication = async (req, res) => {
    try {
        const { jobId, resumeLink, coverLetter } = req.body;
        const applications = await (0, db_1.getCollection)('applications');
        const existing = await applications.findOne({ candidateId: req.user.id, jobId });
        if (existing)
            return res.status(400).json({ message: 'Application already exists' });
        const app = {
            id: (0, crypto_1.randomUUID)(),
            candidateId: req.user.id,
            jobId,
            resumeLink,
            coverLetter,
            status: 'Applied',
            adminNotes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await applications.insertOne(app);
        return res.status(201).json(app);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to create application' });
    }
};
exports.createApplication = createApplication;
const updateApplication = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const applications = await (0, db_1.getCollection)('applications');
        const app = await applications.findOne({ id: req.params.id });
        if (!app)
            return res.status(404).json({ message: 'Application not found' });
        if (req.user?.role !== 'ADMIN' && app.candidateId !== req.user?.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const update = { updatedAt: new Date() };
        if (status)
            update.status = status;
        if (adminNotes !== undefined)
            update.adminNotes = adminNotes;
        if (Object.keys(update).length === 1)
            return res.status(400).json({ message: 'No changes provided' });
        const updated = await applications.findOneAndUpdate({ id: req.params.id }, { $set: update }, { returnDocument: 'after' });
        return res.json(updated.value);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update application' });
    }
};
exports.updateApplication = updateApplication;
const deleteApplication = async (req, res) => {
    try {
        const applications = await (0, db_1.getCollection)('applications');
        const result = await applications.deleteOne({ id: req.params.id });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: 'Application not found' });
        return res.json({ message: 'Application deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to delete application' });
    }
};
exports.deleteApplication = deleteApplication;
