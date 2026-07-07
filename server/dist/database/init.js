"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../config/db");
const auth_1 = require("../utils/auth");
const initializeDatabase = async () => {
    const users = await (0, db_1.getCollection)('users');
    await users.createIndex({ email: 1 }, { unique: true });
    const jobs = await (0, db_1.getCollection)('jobs');
    await jobs.createIndex({ title: 1, company: 1 });
    const applications = await (0, db_1.getCollection)('applications');
    await applications.createIndex({ candidateId: 1, jobId: 1 });
    const existingAdmin = await users.findOne({ email: 'admin@jobtracker.com' });
    if (!existingAdmin) {
        await users.insertOne({
            id: (0, crypto_1.randomUUID)(),
            name: 'Admin User',
            email: 'admin@jobtracker.com',
            password: await (0, auth_1.hashPassword)('admin123'),
            role: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
};
exports.initializeDatabase = initializeDatabase;
