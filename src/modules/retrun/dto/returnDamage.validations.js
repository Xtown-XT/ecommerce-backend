import { z } from "zod";

export const createReturnDamageSchema = z.object({
  order_item_id: z.number(),
  type: z.enum(["Return", "Damage"]),
  reason: z.string().optional(),
  product_id: z.number(),
  quantity: z.number().min(1),
});

export const updateReturnDamageSchema = createReturnDamageSchema.partial();

export const idSchema = z.object({
  id: z.number(),
});
