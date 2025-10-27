import express from "express";
import {
  createReturnDamage,
  getAllReturnDamage,
  getReturnDamageById,
  updateReturnDamage,
  deleteReturnDamage,
} from "../../retrun/controller/returnDamage.controllers.js";

import { verifyToken } from "../../../middleware/auth.js";
import { validate } from "../../../middleware/validate.js";
import {
  createReturnDamageSchema,
  updateReturnDamageSchema,
  idSchema,
} from "../dto/returnDamage.validations.js";

const router = express.Router();

// 🔒 Create Return/Damage record (protected)
router.post(
  "/returns",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createReturnDamageSchema),
  createReturnDamage
);

// 🔒 Get All Return/Damage records (protected)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getAllReturnDamage
);

// 🔒 Get Return/Damage record by ID (protected)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getReturnDamageById
);

// 🔒 Update Return/Damage record (protected)
router.put(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(updateReturnDamageSchema),
  updateReturnDamage
);

// 🔒 Delete Return/Damage record (protected)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  deleteReturnDamage
);

export default router;
