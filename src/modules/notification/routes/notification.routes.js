import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from "../controller/notification.controllers.js";

import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../../notification/dto/notification.validations.js";
import { z } from "zod";

// Params validation schema
const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID"), // ensure numeric ID
});

const router = express.Router();

// 🔓 Create notification (protected, any role or restrict roles)
router.post(
  "/add",
  verifyToken,
  // authorizeRole(["admin", "superadmin"]), // optional
  validate(createNotificationSchema),
  createNotification
);

// 🔓 Get all notifications (protected, any role)
router.get(
  "/",
  verifyToken,
  // authorizeRole(["user", "admin"]), // optional
  getAllNotifications
);

// 🔒 Get notification by id (protected)
router.get(
  "/:id",
  verifyToken,
  // authorizeRole(["admin", "user"]),
  validate(idSchema, "params"),
  getNotificationById
);

// 🔒 Update notification (protected, e.g., only admin)
router.put(
  "/update:id",
  verifyToken,
  // authorizeRole(["admin"]),
  validate(updateNotificationSchema),
  updateNotification
);

// 🔒 Delete notification (protected, e.g., only admin)
router.delete(
  "/:id",
  verifyToken,
  // authorizeRole(["admin"]),
  validate(idSchema, "params"),
  deleteNotification
);

export default router;
