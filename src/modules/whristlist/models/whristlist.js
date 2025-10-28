import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cust_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.UUID,
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

export default Wishlist;
