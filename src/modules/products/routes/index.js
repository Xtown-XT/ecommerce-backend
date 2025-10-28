import express from "express";
import productRoutes from "../routes/product.routes.js";


const router = express.Router();

// Mount product routes
router.use("/products", productRoutes);


export default router;
