// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import sharp from "sharp";

// /**
//  * Ensure upload directory exists
//  */
// const ensureDirExists = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// /**
//  * Create Multer storage dynamically
//  * (temporary store before compression)
//  */
// const getStorage = (folder) => {
//   const uploadDir = path.join("uploads", folder, "raw"); // store raw first
//   ensureDirExists(uploadDir);

//   return multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//       const uniqueName =
//         Date.now() +
//         "-" +
//         Math.round(Math.random() * 1e9) +
//         path.extname(file.originalname);
//       cb(null, uniqueName);
//     },
//   });
// };

// /**
//  * Validate file types
//  */
// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png|webp|gif/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowed.test(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed (jpg, jpeg, png, webp, gif)!"));
//   }
// };

// /**
//  * Compress and move uploaded images using Sharp
//  * @param {Array} files - multer uploaded files
//  * @param {String} folder - folder to save compressed images
//  * @returns {Promise<Array>} compressed image paths
//  */
// export const compressImages = async (files, folder) => {
//   const compressedDir = path.join("uploads", folder);
//   ensureDirExists(compressedDir);

//   const compressedPaths = [];

//   for (const file of files) {
//     const inputPath = file.path;
//     const outputFilename = file.filename.replace(
//       path.extname(file.filename),
//       ".webp" // convert to webp for compression
//     );
//     const outputPath = path.join(compressedDir, outputFilename);

//     await sharp(inputPath)
//       .resize(1000) // resize width (auto height)
//       .webp({ quality: 80 }) // compress quality
//       .toFile(outputPath);

//     // remove original file (optional)
//     fs.unlinkSync(inputPath);

//     compressedPaths.push(`/uploads/${folder}/${outputFilename}`);
//   }

//   return compressedPaths;
// };

// /**
//  * Multer uploaders
//  */
// export const uploadProduct = multer({
//   storage: getStorage("product"),
//   limits: { fileSize: 10 * 1024 * 1024 }, // allow up to 10MB before compression
//   fileFilter,
// });

// export const uploadProfile = multer({
//   storage: getStorage("customer"),
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter,
// });


import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/customer";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

export const uploadProfile = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
