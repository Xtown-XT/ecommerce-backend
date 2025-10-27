import { z } from "zod";

export const createNotificationSchema = z.object({
  id: z.number().int().optional(),
  customer_id: z.uuid(),
  title: z.string().min(1),
  message: z.string().min(1),
  is_read: z.boolean().optional(),
});

export const updateNotificationSchema = z.object({
  title: z.string().optional(),
  message: z.string().optional(),
  is_read: z.boolean().optional(),
});

