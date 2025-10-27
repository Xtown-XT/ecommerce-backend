import { z } from "zod";

// For creating a category
export const createCategorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

// For updating a category (all fields optional)
export const updateCategorySchema = z.object({
  category_name: z.string().min(1, "Category name cannot be empty").optional(),
  description: z.string().optional(),
});

// For delete or get by id (validate ID in params)
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
