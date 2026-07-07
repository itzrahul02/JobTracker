"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.getJobs = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../config/db");
const getJobs = async (_req, res) => {
    try {
        const jobs = await (0, db_1.getCollection)('jobs');
        const result = await jobs.find({}).sort({ createdAt: -1 }).toArray();
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    try {
        const jobs = await (0, db_1.getCollection)('jobs');
        const job = await jobs.findOne({ id: req.params.id });
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        return res.json(job);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch job' });
    }
};
exports.getJobById = getJobById;
const createJob = async (req, res) => {
    try {
        const { title, company, location, description, employmentType, salary } = req.body;
        const jobs = await (0, db_1.getCollection)('jobs');
        const job = {
            id: (0, crypto_1.randomUUID)(),
            title,
            company,
            location,
            description,
            employmentType,
            salary,
            createdBy: req.user.id,
            createdAt: new Date(),
        };
        await jobs.insertOne(job);
        return res.status(201).json(job);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to create job' });
    }
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    try {
        const { title, company, location, description, employmentType, salary } = req.body;
        const jobs = await (0, db_1.getCollection)('jobs');
        const update = {};
        if (title)
            update.title = title;
        if (company)
            update.company = company;
        if (location)
            update.location = location;
        if (description)
            update.description = description;
        if (employmentType)
            update.employmentType = employmentType;
        if (salary)
            update.salary = salary;
        if (Object.keys(update).length === 0)
            return res.status(400).json({ message: 'No changes provided' });
        const result = await jobs.findOneAndUpdate({ id: req.params.id }, { $set: update }, { returnDocument: 'after' });
        if (!result.value)
            return res.status(404).json({ message: 'Job not found' });
        return res.json(result.value);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update job' });
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        const jobs = await (0, db_1.getCollection)('jobs');
        const result = await jobs.deleteOne({ id: req.params.id });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: 'Job not found' });
        return res.json({ message: 'Job deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to delete job' });
    }
};
exports.deleteJob = deleteJob;
