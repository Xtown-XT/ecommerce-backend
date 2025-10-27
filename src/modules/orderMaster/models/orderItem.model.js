// src/modules/order/models/orderItem.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js"; // adjust path to your db instance

const OrderItem = sequelize.define(
  "OrderItem",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders", // must match the table name for your Order model
        key: "id",
      },
    },
    // product_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Products", // must match product model table name
    //     key: "product_id",
    //   },
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      // price may be a copy of unit_price or some pre-calculated product price snapshot
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_price: {
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
  },
  {
    tableName: "orderitems",
    timestamps: false,
    paranoid:true,
    
  }
);

export default OrderItem;
