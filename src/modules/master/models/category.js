// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Category = sequelize.define(
//   "Category",
//   {
//     category_id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     category_name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     is_Active: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//     allowNull: false,
//   },
//   created_By: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   updated_By: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   },
//   {
//     tableName: "categories",
//     timestamps: false, 
//     paranoid:true,
//   }
// );

// export default Category;

// // import { DataTypes } from "sequelize";
// // import { sequelize } from "../../../db/index.js";

// // const Category = sequelize.define(
// //   "Category",
// //   {
// //     id: {                              // ✅ renamed to match FK in Product
// //       type: DataTypes.UUID,
// //       defaultValue: DataTypes.UUIDV4,
// //       primaryKey: true,
// //     },
// //     category_name: {
// //       type: DataTypes.STRING(100),
// //       allowNull: false,
// //     },
// //     description: {
// //       type: DataTypes.TEXT,
// //       allowNull: true,
// //     },
// //     is_Active: {
// //       type: DataTypes.BOOLEAN,
// //       defaultValue: true,
// //     },
// //   },
// //   {
// //     tableName: "categories",
// //     timestamps: false,
// //     paranoid:false
// //   }
// // );

// // export default Category;
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ auto-generate UUID
      primaryKey: true,
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
    paranoid: false, // ✅ No soft delete since timestamps are off
  }
);

export default Category;
