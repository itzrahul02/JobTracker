"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2),
        company: zod_1.z.string().min(2),
        location: zod_1.z.string().min(2),
        description: zod_1.z.string().min(10),
        employmentType: zod_1.z.string().min(2),
        salary: zod_1.z.string().optional(),
    }),
});
exports.updateJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2).optional(),
        company: zod_1.z.string().min(2).optional(),
        location: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().min(10).optional(),
        employmentType: zod_1.z.string().min(2).optional(),
        salary: zod_1.z.string().optional(),
    }),
});
