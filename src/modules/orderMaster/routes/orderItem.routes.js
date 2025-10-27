import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItemController,
  deleteOrderItemController,
} from "../../orderMaster/controller/orderItem.controllers.js";

import { verifyToken } from "../../../middleware/auth.js";
import { validate } from "../../../middleware/validate.js";
import {
  createOrderItemSchema,
  updateOrderItemSchema,
  idParamSchema,
} from "../../orderMaster/dto/orderItem.validations.js";

const router = express.Router();

// 🔒 Create Order Item (protected — only admin or superadmin)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(createOrderItemSchema),
  createOrderItem
);

// 🔒 Get All Order Items (protected — any authenticated user)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  getOrderItems
);

// 🔒 Get Order Item By ID (protected — any authenticated user)
router.get(
  "/:order_item_id",
  verifyToken,
  // authorizeRole(["admin", "superadmin", "user"]),
  validate(idParamSchema, "params"),
  getOrderItem
);

// 🔒 Update Order Item (protected — only admin or superadmin)
router.put(
  "/:order_item_id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(updateOrderItemSchema),
  updateOrderItemController
);

// 🔒 Delete Order Item (protected — only admin or superadmin)
router.delete(
  "/:order_item_id",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]),
  validate(idParamSchema, "params"),
  deleteOrderItemController
);

export default router;
