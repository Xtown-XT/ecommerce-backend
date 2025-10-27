import express from "express";
import {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
} from "../../whristlist/controller/whristlist.controllers.js";

import { verifyToken } from "../../../middleware/auth.js";
import { validate } from "../../../middleware/validate.js";
import {
  createWishlistSchema,
  updateWishlistSchema,
  idSchema,
} from "../../whristlist/dto/whristlist.validations.js";

const router = express.Router();

// 🔒 Create Wishlist (protected — only admin or superadmin)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createWishlistSchema),
  createWishlist
);

// 🔒 Get All Wishlists (protected — any authenticated user)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getAllWishlists
);

// 🔒 Get Wishlist by ID (protected — any authenticated user)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getWishlistById
);

// 🔒 Update Wishlist (protected — only admin or superadmin)
router.put(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(updateWishlistSchema),
  updateWishlist
);

// 🔒 Delete Wishlist (protected — only admin or superadmin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  deleteWishlist
);

export default router;
