import express from "express";
import notificationRoutes from "../../notification/routes/notification.routes.js"; // adjust path if needed

const router = express.Router();

// Mount notification routes
router.use("/notifications", notificationRoutes);

export default router;
