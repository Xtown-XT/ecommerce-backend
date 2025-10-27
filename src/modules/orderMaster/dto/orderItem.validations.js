// src/modules/order/dto/orderItem.validations.js
import { z } from "zod";

export const createOrderItemSchema = z.object({
  order_id: z.number().int().positive(),
  // product_id: z.number().int().positive(),
  quantity: z.number().int().min(1),
  unit_price: z
    .union([z.number(), z.string()])
    .transform((v) => Number(v))
    .refine((n) => !Number.isNaN(n) && n >= 0),
  price: z
    .union([z.number(), z.string()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 0)),
});

export const updateOrderItemSchema = z.object({
  quantity: z.number().int().min(1).optional(),
  unit_price: z
    .union([z.number(), z.string()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 0)),
  price: z
    .union([z.number(), z.string()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 0)),
});

export const idParamSchema = z.object({
  order_item_id: z.string().transform((s) => Number(s)).refine((n) => Number.isInteger(n) && n > 0),
});
