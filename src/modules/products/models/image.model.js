import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Product from "./product.model.js";

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Automatically generates UUID
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    file: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Path or URL of the uploaded image",
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Original filename of the image",
    },

    alternative: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Alternative text (alt attribute for accessibility)",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },

    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "images",
    timestamps: true,
    paranoid: true, // ✅ Adds deletedAt for soft deletes
  }
);

// ✅ Association
Product.hasMany(Image, { foreignKey: "product_id", onDelete: "CASCADE" });
Image.belongsTo(Product, { foreignKey: "product_id" });

export default Image;
