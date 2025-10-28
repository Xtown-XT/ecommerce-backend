import { z } from "zod";

export const createProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  category_id: z.number().int().positive(),
  metal_type_id: z.number().int().positive(),
  description: z.string().optional(),
  unit_price: z.number().positive(),
  total_weight: z.number().positive(),
  price: z.number().positive(),
  making_charges: z.number().optional(),
  barcode: z.string().optional(),
  gst: z.number().optional(),
  stock_qty: z.number().int().optional(),
  created_By: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid number"),
});
