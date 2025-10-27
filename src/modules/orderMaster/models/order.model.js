import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  gst_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
 is_Active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  created_By: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updated_By: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "orders",
  timestamps: false,
  paranoid:true,
});

export default Order;
