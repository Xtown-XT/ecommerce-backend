import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const MetalMaster = sequelize.define("MetalMaster", {
  metal_master_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  metal_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metal_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  current_rate: {
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
  tableName: "metal_master",
  timestamps: false,
  paranoid:true,
});

export default MetalMaster;
