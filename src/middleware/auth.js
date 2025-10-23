// // middlewares/verifyToken.js
// import jwt from 'jsonwebtoken';


// const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Missing or malformed token' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         // Debugging line to check token content
//         req.user = decoded; // Attach decoded user to request
//         // if (roles.length && !roles.includes(decoded.role)) {
//         //     return res.status(403).json({ message: "Forbidden: Access denied" });
//         // }
//         next(); // Token is valid, proceed
//     } catch (err) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };




// // middlewares/verifyToken.js
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Missing or malformed token' });
//     }

//     const token = authHeader.split(' ')[1];
//     console.log("Token received:", token);
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         console.log("Decoded token:", decoded);
//         // Attach decoded info to request
//         req.user = {
//             id: decoded.id,
//             role: decoded.role,
//             role_id: decoded.role_id
//         };

//         next();
//     } catch (err) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };



// middlewares/verifyToken.js
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { JWT_SECRET } from "../utils/token.js"; // Use the same secret as token generation

// dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Missing or malformed token" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // Decode and verify using the exact secret
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // Attach user info to request
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Customer from "../modules/customer/models/customer.js"; // ✅ import your model
import { JWT_SECRET } from "../utils/token.js"; // ensure this matches token generation

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // 1️⃣ Check header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or malformed token" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3️⃣ Find customer in database
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 4️⃣ Attach full customer to request (so updateProfile can use verifyOtp, etc.)
    req.customer = customer;

    // ✅ Proceed to next handler
    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

