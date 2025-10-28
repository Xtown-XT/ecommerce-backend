import { z } from "zod";

export const createOrderSchema = z.object({
  order_code: z.string().min(1),
  customer_id: z.uuid(),
  order_date: z.string(),
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  total_amount: z.number(),
  gst_amount: z.number(),
});

export const updateOrderSchema = z.object({
  order_code: z.string().optional(),
  customer_id: z.number().optional(),
  order_date: z.string().optional(),
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  total_amount: z.number().optional(),
  gst_amount: z.number().optional(),
});

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

