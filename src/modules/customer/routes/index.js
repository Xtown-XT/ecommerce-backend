import express from 'express';
import customerRoutes from '../../customer/routes/authRoutes.js';  

const router = express.Router();

// Mount customer routes
router.use('/customer', customerRoutes);

export default router;

