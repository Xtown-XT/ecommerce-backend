import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const ReturnDamage = sequelize.define("ReturnDamage", {
  return_damage_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_item_id: {
    type: DataTypes.UUID,
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
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_Active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  created_By: {
    type: DataTypes.STRING,
  },
  updated_By: {
    type: DataTypes.STRING,
  },
});
export default ReturnDamage;
