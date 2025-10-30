// 
import { z } from "zod";

export const createProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  category_id: z.string().uuid({ message: "Invalid category_id format" }), // ✅ UUID
  metal_master_id: z.string().uuid({ message: "Invalid metal_master_id format" }), // ✅ UUID
  description: z.string().optional(),
  unit_price: z.number().positive({ message: "Unit price must be positive" }),
  total_weight: z.number().positive({ message: "Total weight must be positive" }),
  price: z.number().positive({ message: "Price must be positive" }),
  making_charges: z.number().optional(),
  barcode: z.string().optional(),
  gst: z.number().optional(),
  stock_qty: z.number().int().optional(),
  created_by: z.string().optional(), // ✅ lowercase to match your model
});

export const updateProductSchema = createProductSchema.partial();

// ✅ ID schema should be UUID, not number
export const idSchema = z.object({
  id: z.string().uuid({ message: "ID must be a valid UUID" }),
});
