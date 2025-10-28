// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Order = sequelize.define("Order", {
//   order_id: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   order_code: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   customer_id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   order_date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
//     defaultValue: "Pending",
//   },
//   total_amount: {
//     type: DataTypes.DECIMAL,
//     allowNull: false,
//   },
//   gst_amount: {
//     type: DataTypes.DECIMAL,
//     allowNull: false,
//   },
//  is_Active: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//     allowNull: false,
//   },
//   created_By: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   updated_By: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// }, {
//   tableName: "orders",
//   timestamps: false,
//   paranoid:true,
// });

// export default Order;
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Sequelize will auto-generate UUIDs
    primaryKey: true,
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customer_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Pending",
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  gst_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  is_Active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_By: {
    type: DataTypes.STRING,
  },
  updated_By: {
    type: DataTypes.STRING,
  },
});
Order.beforeCreate(async (order) => {
  const datePart = new Date().toISOString().split("T")[0].replace(/-/g, ""); // e.g., 20251028
  const randomPart = Math.floor(1000 + Math.random() * 9000); // e.g., 4821
  order.order_code = `ORD-${datePart}-${randomPart}`;
});

export default Order;
