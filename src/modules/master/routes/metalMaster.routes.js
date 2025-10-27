import express from "express";
import {
  createMetal,
  getAllMetals,
  getMetalById,
  updateMetal,
  deleteMetal,
} from "../controller/metalMaster.controller.js";

import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createMetalSchema,
  updateMetalSchema,
  idSchema,
} from "../../master/dto/metalMaster.validations.js";

const router = express.Router();

// 🔒 Create Metal (protected — only admin or superadmin)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createMetalSchema),
  createMetal
);

// 🔒 Get All Metals (protected — any authenticated user)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getAllMetals
);

// 🔒 Get Metal By ID (protected — any authenticated user)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getMetalById
);

// 🔒 Update Metal (protected — only admin or superadmin)
router.put(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(updateMetalSchema),
  updateMetal
);

// 🔒 Delete Metal (protected — only admin or superadmin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  deleteMetal
);

export default router;
