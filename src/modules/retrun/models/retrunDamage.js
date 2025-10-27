import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js"; 

const ReturnDamage = sequelize.define("ReturnDamage", {
  return_damage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Return", "Damage"),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
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
  tableName: "return_damage",
  timestamps: false,
  paranoid:true,
});

export default ReturnDamage;
