// // src/modules/order/dto/orderItem.validations.js
import { z } from "zod";

export const createOrderItemSchema = z.object({
  order_id: z.string().uuid({ message: "Invalid order_id format" }),
  // product_id: z.number().int().positive().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  unit_price: z
    .union([z.number(), z.string()])
    .transform((v) => Number(v))
    .refine((n) => !Number.isNaN(n) && n >= 0, "Invalid unit price"),
  total_price: z
    .union([z.number(), z.string()])
    .transform((v) => Number(v))
    .refine((n) => !Number.isNaN(n) && n >= 0, "Invalid total price"),
});

export const updateOrderItemSchema = z.object({
  quantity: z.number().int().min(1).optional(),
  unit_price: z
    .union([z.number(), z.string()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 0), {
      message: "Invalid unit price",
    }),
  total_price: z
    .union([z.number(), z.string()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 0), {
      message: "Invalid total price",
    }),
});

export const idParamSchema = z.object({
  order_item_id: z.string().uuid({ message: "Invalid order_item_id format" }),
});
