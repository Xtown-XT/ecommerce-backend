import express from "express";
import orderRoutes from "../routes/order.routes.js";
import orderItemRoutes from '../routes/orderItem.routes.js'

const router = express.Router();

// Mount order routes
router.use("/orders", orderRoutes);

router.use("/orderitems", orderItemRoutes);
export default router;
