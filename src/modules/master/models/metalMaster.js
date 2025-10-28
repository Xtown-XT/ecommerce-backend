import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const MetalMaster = sequelize.define(
  "MetalMaster",
  {
    metal_master_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Automatically generate UUID
      primaryKey: true,
    },

    metal_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    metal_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    current_rate: {
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
    tableName: "metal_master",
    timestamps: false,
    paranoid:false
  }
);

export default MetalMaster;
