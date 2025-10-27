// import express from "express";
// // import { registerOrLogin, verifyOtp } from "../controller/authController.js";

// const router = express.Router();

// router.post("/register", );
// router.post("/verify", verifyOtp);

// export default router;
import express from "express";
import {
  requestOTP,
  verifyOTP,
  updateProfile,
  getProfile,
  getAllCustomers
} from "../controller/authController.js";
import { verifyToken } from "../../../middleware/auth.js"; // optional, for profile routes

const router = express.Router();

// Request OTP (register/login with phone)
router.post("/register", requestOTP);

// Verify OTP
router.post("/verify", verifyOTP);

// // Get logged-in customer's profile
// router.get("/profile", authenticateCustomer, getProfile);

// Update logged-in customer's profile
// router.post("/profile",verifyToken,createProfile )
router.put("/profile", verifyToken, updateProfile);

// // Get all customers (admin purpose)
router.get("/all", getAllCustomers);

export default router;

