"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationSchema = exports.applyJobSchema = void 0;
const zod_1 = require("zod");
exports.applyJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobId: zod_1.z.number().int().positive(),
        resumeLink: zod_1.z.string().url().optional(),
        coverLetter: zod_1.z.string().optional(),
    }),
});
exports.updateApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['Applied', 'Interview', 'Offer', 'Rejected']).optional(),
        adminNotes: zod_1.z.string().optional(),
    }),
});
