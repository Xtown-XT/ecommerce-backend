import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../master/controller/category.authController.js";

import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
  idSchema,
} from "../dto/category.authValidations.js";

const router = express.Router();

// 🔓 Create category (protected, only admin or superadmin)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createCategorySchema),
  createCategory
);

// 🔓 Get all categories (protected, any role)
router.get(
  "/",
  verifyToken,
  // authorizeRole([ "user"]),
  getCategories
);

// 🔒 Get category by id (protected, any role)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getCategoryById
);

// 🔒 Update category (protected, only admin)
router.put(
  "/:id",
  verifyToken,
  // authorizeRole(["admin"]),
  validate(updateCategorySchema),
  updateCategory
);

// 🔒 Delete category (protected, only admin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin"]),`
  validate(idSchema, "params"),
  deleteCategory
);

export default router;
