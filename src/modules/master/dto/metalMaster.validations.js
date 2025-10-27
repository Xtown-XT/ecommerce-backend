// import { z } from "zod";

// export const createMetalSchema = z.object({
//   body: z.object({
//     metal_name: z.string().min(1, "Metal name is required"),
//     purity: z.string().optional(),
//     description: z.string().optional(),
//   }),
// });

// export const updateMetalSchema = z.object({
//   body: z.object({
//     metal_name: z.string().optional(),
//     purity: z.string().optional(),
//     description: z.string().optional(),
//   }),
// });

// export const idSchema = z.object({
//   params: z.object({
//     id: z
//       .string()
//       .regex(/^\d+$/, "ID must be a number")
//       .transform((val) => Number(val)),
//   }),
// });
// src/modules/master/dto/metalValidations.js
import { z } from "zod";

// -------------------- CREATE METAL --------------------
export const createMetalSchema = z.object({
  metal_name: z.string().min(1, "Metal name is required"),
  metal_type: z.string().min(1, "Metal type is required"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  unit_price: z.number().min(0, "Unit price must be a positive number"),
  current_rate: z.number().min(0, "Current rate must be a positive number"),
});

// -------------------- UPDATE METAL --------------------
export const updateMetalSchema = z.object({
  metal_name: z.string().optional(),
  metal_type: z.string().optional(),
  quantity: z.number().optional(),
  unit_price: z.number().optional(),
  current_rate: z.number().optional(),
});

// -------------------- ID VALIDATION --------------------
export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});

