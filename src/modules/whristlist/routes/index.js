import express from "express";
import wishlistRoutes from "../routes/whristlist.routes.js"; // adjust path if needed

const router = express.Router();

// Mount Wishlist routes
router.use("/wishlist", wishlistRoutes);

export default router;
