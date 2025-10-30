import Product from "../../products/models/product.model.js";
import Image from "../../products/models/image.model.js";
import { uploadProfile } from "../../../middleware/upload.js"; // 👈 Import this from your upload middleware


// // ✅ Create Product with Images
// export const createProduct = async (req, res) => {
//   const t = await Product.sequelize.transaction();

//   try {
//     const {
//       product_name,
//       category_id,
//       metal_type_id,
//       description,
//       unit_price,
//       total_weight,
//       price,
//       making_charges,
//       barcode,
//       gst,
//       stock_qty,
//       created_by,
//     } = req.body;

//     // Step 1: Create Product
//     const product = await Product.create(
//       {
//         product_name,
//         category_id,
//         metal_type_id,
//         description,
//         unit_price,
//         total_weight,
//         price,
//         making_charges,
//         barcode,
//         gst,
//         stock_qty,
//         created_by,
//       },
//       { transaction: t }
//     );

//     // Step 2: Handle Uploaded Images
//     if (req.files && req.files.length > 0) {
//       const imageRecords = req.files.map((file) => ({
//         product_id: product.product_id,
//         file: `/uploads/${file.filename}`,
//         filename: file.originalname,
//         alternative: file.originalname.split(".")[0],
//         created_by,
//       }));

//       await Image.bulkCreate(imageRecords, { transaction: t });
//     }

//     await t.commit();
//     return res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     await t.rollback();
//     console.error("Error creating product:", error);
//     return res.status(500).json({ message: "Failed to create product", error });
//   }
// };

// import Product from "../models/product.model.js";
// import Image from "../models/image.model.js";
// import { compressImages } from "../../../middleware/upload.js"; // 👈 Import this from your upload middleware

// ✅ Create Product with Images + Compression
// export const createProduct = async (req, res) => {
//   const t = await Product.sequelize.transaction();

//   try {
//     const {
//       product_name,
//       category_id,
//       metal_type_id,
//       description,
//       unit_price,
//       total_weight,
//       price,
//       making_charges,
//       barcode,
//       gst,
//       stock_qty,
//       created_by,
//     } = req.body;

//     // ✅ Step 1: Compress Uploaded Images (if any)
//     let imagePaths = [];
//     if (req.files && req.files.length > 0) {
//       imagePaths = await compressImages(req.files, "product"); // returns array of compressed file paths
//     }

//     // ✅ Step 2: Create Product
//     const product = await Product.create(
//       {
//         product_name,
//         category_id,
//         metal_type_id,
//         description,
//         unit_price,
//         total_weight,
//         price,
//         making_charges,
//         barcode,
//         gst,
//         stock_qty,
//         created_by,
//       },
//       { transaction: t }
//     );

//     // ✅ Step 3: Save Images in DB
//     if (imagePaths.length > 0) {
//       const imageRecords = imagePaths.map((filePath, index) => ({
//         product_id: product.product_id,
//         file: filePath, // e.g., /uploads/product/xxxx.webp
//         filename: req.files[index].originalname,
//         alternative: req.files[index].originalname.split(".")[0],
//         created_by,
//       }));

//       await Image.bulkCreate(imageRecords, { transaction: t });
//     }

//     // ✅ Step 4: Commit transaction
//     await t.commit();

//     return res.status(201).json({
//       message: "✅ Product created successfully",
//       product,
//     });
//   } catch (error) {
//     await t.rollback();
//     console.error("❌ Error creating product:", error);
//     return res.status(500).json({ message: "Failed to create product", error });
//   }
// };


// ✅ Get All Products with Images
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Image, as: "images" }],
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
};

// ✅ Get Product by ID with Images
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: Image, as: "images" }],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product", error });
  }
};

// // ✅ Update Product + Images
// export const updateProduct = async (req, res) => {
//   const t = await Product.sequelize.transaction();

//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const product = await Product.findByPk(id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     await product.update(updates, { transaction: t });

//     if (req.files && req.files.length > 0) {
//       const imageRecords = req.files.map((file) => ({
//         product_id: product.product_id,
//         file: `/uploads/${file.filename}`,
//         filename: file.originalname,
//         alternative: file.originalname.split(".")[0],
//         created_by: updates.updated_by || "system",
//       }));
//       await Image.bulkCreate(imageRecords, { transaction: t });
//     }

//     await t.commit();
//     return res.json({ message: "Product updated successfully", product });
//   } catch (error) {
//     await t.rollback();
//     console.error("Error updating product:", error);
//     return res.status(500).json({ message: "Failed to update product", error });
//   }
// };

// ✅ Delete Product (soft delete)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product", error });
  }
};

