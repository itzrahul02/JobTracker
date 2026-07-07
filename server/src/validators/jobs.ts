import { z } from 'zod';

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    company: z.string().min(2),
    location: z.string().min(2),
    description: z.string().min(0),
    employmentType: z.string().min(2),
    salary: z.string().optional(),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    company: z.string().min(2).optional(),
    location: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    employmentType: z.string().min(2).optional(),
    salary: z.string().optional(),
  }),
});
