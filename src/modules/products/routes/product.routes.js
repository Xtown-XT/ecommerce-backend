import express from "express";
import {
  // createProduct,
  getProducts,
  getProduct,
  // updateProduct,
  deleteProduct,
} from "../../products/controller/product.controller.js";

import { verifyToken } from "../../../middleware/auth.js";
import { validate } from "../../../middleware/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  idSchema,
} from "../../products/dto/product.validations.js";


// import { uploadProduct } from "../../../middleware/upload.js";
const router = express.Router();


// // 🔒 Create Product (protected — only admin or superadmin)
// router.post(
//   "/add",
//   verifyToken,
//   // authorizeRole(["admin", "superadmin"]),
//   uploadProduct.array("images", 5), // allow multiple images
//   validate(createProductSchema),
//   createProduct
// );

// 🔒 Get All Products (protected — any authenticated user)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getProducts
);

// 🔒 Get Product By ID (protected — any authenticated user)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getProduct
);

// // 🔒 Update Product (protected — only admin or superadmin)
// router.put(
//   "/:id",
//   verifyToken,
//   // authorizeRole(["admin", "superadmin"]),
//   uploadProduct.array("images", 5),
//   validate(updateProductSchema),
//   updateProduct
// );

// 🔒 Delete Product (protected — only admin or superadmin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  deleteProduct
);

export default router;
