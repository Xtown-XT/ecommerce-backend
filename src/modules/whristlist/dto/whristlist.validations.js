import { z } from "zod";

export const createWishlistSchema = z.object({
  cust_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
});

export const updateWishlistSchema = z.object({
  cust_id: z.number().int().positive().optional(),
  product_id: z.number().int().positive().optional(),
});

export const idSchema = z.object({
  id: z
    .string({ required_error: "ID is required" })
    .regex(/^[0-9]+$/, "ID must be a valid number"),
})    

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", message: "Validation failed", details: err.errors });
  }
};
