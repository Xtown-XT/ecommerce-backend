// // index.js
// import dotenv from 'dotenv';
// import os from 'os';
// import app from './src/index.js';                     // ✅ Your main Express app
// import { sequelize } from "../ecommerce-project/src/db/index.js";

// // Load .env variables
// dotenv.config();

// // Function to get the local IP address
// function getLocalIP() {
//   const interfaces = os.networkInterfaces();
//   for (const name of Object.keys(interfaces)) {
//     for (const iface of interfaces[name]) {
//       if (iface.family === 'IPv4' && !iface.internal) {
//         return iface.address;
//       }
//     }
//   }
//   return '0.0.0.0';
// }

// // Server configuration
// const port = process.env.PORT || 5000;
// const host = process.env.HOST || getLocalIP();

// // Start the server
// app.listen(port, host, async () => {
//   try {
//     // Sync models with DB
//     await sequelize.sync();
//     // Optional: to rebuild tables, use { force: true }
//     // await sequelize.sync({ force: true });

//     console.log(`✅ Server running at http://${host}:${port}`);
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// });

// index.js

import app from './src/index.js';
import dotenv from 'dotenv';
import os from 'os';


// Import two separate Sequelize instances with different names
import { sequelize  } from './src/db/index.js';
// import { sequelize as xtownSequelize } from './src/db/xtown.js';

// ← Add this import:
// import { sequelize } from './src/db/index.js';


dotenv.config();

const port = process.env.PORT || 5000;
const host = process.env.HOST || getLocalIP();

// Function to get the local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '0.0.0.0';
}


// Start server and sync both databases
app.listen(port, host, async () => {
  try {
    // Sync tables for both databases
    await sequelize.sync();      // Sync hrms_demo
    // await xtownSequelize.sync();     // Sync xtown / att


    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
});