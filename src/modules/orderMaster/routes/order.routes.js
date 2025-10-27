import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../../orderMaster/controller/order.controllers.js";

import { verifyToken } from "../../../middleware/auth.js";
import { validate } from "../../../middleware/validate.js";
import {
  createOrderSchema,
  updateOrderSchema,
  idSchema,
} from "../../orderMaster/dto/order.validations.js";

const router = express.Router();

// 🔒 Create Order (protected — only admin or superadmin)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createOrderSchema),
  createOrder
);

// 🔒 Get All Orders (protected — any authenticated user)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getOrders
);

// 🔒 Get Order By ID (protected — any authenticated user)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idSchema, "params"),
  getOrder
);

// 🔒 Update Order (protected — only admin or superadmin)
router.put(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(updateOrderSchema),
  updateOrder
);

// 🔒 Delete Order (protected — only admin or superadmin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  deleteOrder
);

export default router;
