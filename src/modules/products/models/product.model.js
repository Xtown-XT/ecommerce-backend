// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";
// import Category from "../../master/models/category.js";

// const Product = sequelize.define(
//   "Product",
//   {
//     product_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4, // ✅ Automatically generate UUID
//       primaryKey: true,
//     },

//     product_name: {
//       type: DataTypes.STRING(150),
//       allowNull: false,
//     },

//     category_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "categories",
//         key: "category_id",
//       },
//     },

//     metal_type_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },

//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },

//     unit_price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },

//     total_weight: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },

//     price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },

//     making_charges: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: true,
//     },

//     barcode: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },

//     gst: {
//       type: DataTypes.DECIMAL(5, 2),
//       allowNull: true,
//     },

//     stock_qty: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },

//     is_Active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//       allowNull: false,
//     },

//     created_By: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     updated_By: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "products",
//     timestamps: false,
//   }
// );

// // ✅ Correct Associations
// // Category model
// Category.hasMany(Product, { foreignKey: "category_id" });

// // Product model
// Product.belongsTo(Category, { foreignKey: "category_id" });


// export default Product;
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Category from "../../master/models/category.js";

const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Automatically generate UUID
      primaryKey: true,
    },

    product_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id",
      },
    },

  metal_master_id: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: "metal_master", // same as your table name
    key: "metal_master_id", // ✅ correct column name
  },
},

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    total_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    making_charges: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    barcode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    gst: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },

    stock_qty: {
      type: DataTypes.INTEGER,
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
    tableName: "products",
    timestamps: false,
    paranoid:false
  }
);

// ✅ Associations
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });


export default Product;
