import express from 'express';
import categoriesRoutes from '../../master/routes/category.authRoutes.js';  
import metalRoutes from "../routes/metalMaster.routes.js";

const router = express.Router();

// Mount customer routes
router.use('/categories', categoriesRoutes);

router.use("/metals", metalRoutes);

export default router;

