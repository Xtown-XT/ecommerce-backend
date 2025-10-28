// src/modules/order/models/orderItem.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Order from "./order.model.js"; // ✅ import the parent model

const OrderItem = sequelize.define(
  "OrderItem",
  {
    order_item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ automatically generate UUIDs
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order, // ✅ directly reference the imported model
        key: "order_id",
      },
    },
    // product_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "products",
    //     key: "product_id",
    //   },
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
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
  },
  {
    tableName: "orderitems",
    timestamps: false,
  }
);

// ✅ Define associations after both models are defined
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

export default OrderItem;
