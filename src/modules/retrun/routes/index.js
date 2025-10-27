import express from "express";
import returnDamageRoutes from "../routes/returnDamage.routes.js"; // adjust path if needed

const router = express.Router();

// Mount Return/Damage routes
router.use("/returndamage", returnDamageRoutes);

export default router;
