import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {responseHelper } from './middleware/index.js';
// import userRoutes from './user/routes/index.js';
// import userRoutes from '../src/modules/customer/routes/authRoutes.js';
// import authRoutes from '../src/modules/customer/routes/authRoutes.js'
import authRoutes from "./modules/customer/routes/index.js"
// import profileRoutes from "./modules/customer/routes/index.js";
import categoryRoutes from "./modules/master/routes/index.js";
import metalRoutes from '../src/modules/master/routes/index.js';
import orderRoutes from '../src/modules/orderMaster/routes/index.js'
import orderItemRoutes from '../src/modules/orderMaster/routes/index.js'
import notificationRoutes from '../src/modules/notification/routes/index.js'
import returnDamageRoutes from '../src/modules/retrun/routes/index.js'
import wishlistRoutes from '../src/modules/whristlist/routes/index.js'
import productRoutes from '../src/modules/products/routes/index.js'
const app = express();

// app.use(express.urlencoded({ extended: true })); 
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));
// app.use(helmet());
// app.use(responseHelper);
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // ✅ this is correct
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(responseHelper);

app.get('/', (req, res) => {
  res.send("Hello World!!").status(404);
}
);

app.get('/api/data', (req, res) => {
  res.sendSuccess({ value: 42 }, 'Data fetched successfully');
});

app.get('/api/error', (req, res) => {
  res.sendError('Something went wrong', 422, [{ field: 'email', message: 'Invalid' }]);
});

//customer
app.use("/ecommerce_api/v1", authRoutes);
//category
app.use("/ecommerce_api/v1", categoryRoutes);
//master
app.use("/ecommerce_api/v1", metalRoutes);
//order
app.use("/ecommerce_api/v1", orderRoutes);
//order-item
app.use("/ecommerce_api/v1", orderItemRoutes);
//notification
app.use("/ecommerce_api/v1", notificationRoutes);
//retrun
app.use("ecommerce_api/v1", returnDamageRoutes);
//whristlist
app.use("ecommerce_api/v1", wishlistRoutes);
//products
app.use("ecommerce_api/v1", productRoutes);

app.use((req, res) => {
  return res.sendError('Route not found', 404);
});

export default app; 