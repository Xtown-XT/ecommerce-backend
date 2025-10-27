// import app from './src/index.js';
// import dotenv from 'dotenv';
// import { sequelize } from './src/db/index.js';
// import authRoutes from './routes/authRoutes.js'; 
// import errorHandler from "./middleware/errorHandler.js";
// import Customer from "./models/customer.js"; 

// dotenv.config();
// const port = process.env.PORT || 5000;



// app.use('/api/auth', authRoutes);
// // error handler
// app.use(errorHandler);


// app.listen(port, async () => {
//   try {
//     await sequelize.sync();
//     console.log(`✅ Server is running on port ${port}`);
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// });

// async function start() {
//   try {
//     await sequelize.authenticate();
//     console.log("DB connected");

//     // sync models (development). For production use migrations.
//     await sequelize.sync({ alter: true });
//     console.log("Models synced");

//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// }

// start();
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/db/index.js'; // default export
// import authRoutes from '../ecommerce-project/src/modules/customer/routes/authRoutes.js';
import errorHandler from '../ecommerce-project/src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());



// Global error handler
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models (for development)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced');

    // Start Express server
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

