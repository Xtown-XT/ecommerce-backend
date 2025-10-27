import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "categories",
    timestamps: false, 
    paranoid:true,
  }
);

export default Category;
