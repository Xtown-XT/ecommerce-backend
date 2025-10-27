
// import { Sequelize, DataTypes, Op } from '@sequelize/core';
// import dotenv from 'dotenv';

// dotenv.config();
// const Sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });

// try {
//   await sequelize.authenticate();
//   console.log("✅ Database connected successfully");
// } catch (err) {
//   console.error("❌ Database connection error:", err);
// }

// export { sequelize, DataTypes, Op };



// src/db/index.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";



dotenv.config();

const sequelize = new Sequelize("ecommerce", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
});

// try {
//   await sequelize.authenticate();
//   console.log("✅ Database connected successfully");
// } catch (err) {
//   console.error("❌ Database connection error:", err);
// }

// export { sequelize, DataTypes, Op };


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
};

export { sequelize };

