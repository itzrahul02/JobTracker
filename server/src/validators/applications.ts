import { z } from 'zod';

export const updateApplicationSchema = z.object({
  body: z.object({
    status: z.enum(['Applied','Interview','Offer','Rejected']).optional(),
    adminNotes: z.string().optional(),
  }),
});
