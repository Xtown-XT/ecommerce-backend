
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Customer from "../models/customer.js";
import { generateOTP, hashPassword } from "../../../utils/auth.js";
import { sendSMSOTP } from "../../../utils/sendOTP.js";
import { generateToken } from "../../../utils/jwt.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";

// ✅ Request OTP or Login with Password
export const requestOTP = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    let customer = await Customer.findOne({ where: { phone } });

    // ✅ Case 1: If password not given → OTP flow
    if (!password) {
      // Create new customer if not exists
      if (!customer) {
        const tempPassword = generateOTP(); // temporary password
        customer = await Customer.create({
          phone,
          password: await hashPassword(tempPassword),
        });
      }

      // Generate OTP
      const otp = generateOTP();
      const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
      await customer.update({ otp, otpExpiry: expiry, verifyOtp: false });

      // (In real app → await sendSMSOTP(phone, otp))
      console.log(`📲 OTP for ${phone}: ${otp}`);

      return res.json({ message: "OTP sent successfully", otp });
    }

    // ✅ Case 2: Login with password
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const comparePass = await bcrypt.compare(password, customer.password);
    if (!comparePass)
      return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(
      { id: customer.id, phone: customer.phone },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ message: "Login successful", token , customer});
  } catch (err) {
    console.error("❌ requestOTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Verify OTP and Login
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ message: "Phone and OTP required" });

    const customer = await Customer.findOne({ where: { phone } });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Validate OTP
    if (customer.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (customer.otpExpiry && new Date() > customer.otpExpiry)
      return res.status(400).json({ message: "OTP expired" });

    // Update verification
    await customer.update({ verifyOtp: true, otp: null, otpExpiry: null });

    const token = generateToken(
      { id: customer.id, phone: customer.phone },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "OTP verified successfully", token , customer });
  } catch (err) {
    console.error("❌ verifyOTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update profile
// export const updateProfile = async (req, res) => {
//   try {
//     const customer = req.customer;
//     if (!customer.verifyOtp)
//       return res.status(403).json({ message: "Customer not verified" });

//     const allowedFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "password",
//       "address",
//       "country",
//       "state",
//       "city",
//       "pincode",
//       "profile_image"
//     ];

//     const updateData = {};
//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) updateData[field] = req.body[field];
//     }

//     // Hash password if it's being updated
//     if (updateData.password)
//       updateData.password = await hashPassword(updateData.password);


//     if (req.file) {
//       const [compressedPath] = await compressImages([req.file], "customer");
//       updateData.profile_image = compressedPath;
//     }
//     await customer.update(updateData);

//     res.json({ message: "Profile updated successfully", customer });
//   } catch (err) {
//     console.error("❌ updateProfile error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ✅ Update profile with form-data (including profile image upload)
export const updateProfile = async (req, res) => {
  try {
    // Ensure authenticated user
    const customer = req.customer;
    if (!customer)
      return res.status(401).json({ message: "Unauthorized: No customer found" });

    if (!customer.verifyOtp)
      return res.status(403).json({ message: "Customer not verified" });

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    // ✅ Fields allowed to update
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "country",
      "state",
      "city",
      "pincode"
    ];

    const updateData = {};

    // ✅ Collect text fields from form-data
    // for (const field of allowedFields) {
    //   // if (req.body[field] && req.body[field].trim() !== "") {
    //   //   updateData[field] = req.body[field];
    //   // }
    // }

    // ✅ Hash password if updated
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    // ✅ Handle profile image upload (if file is sent)
    if (req.file) {
      const [compressedPath] = await compressImages([req.file], "customer");
      updateData.profile_image = compressedPath;
    }

    // ✅ Update customer record
    await customer.update(updateData);

    return res.status(200).json({
      message: "Profile updated successfully",
      data: customer,
    });
  } catch (err) {
    console.error("❌ updateProfile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Profile
export const getProfile = async (req, res) => {
  try {
    const customer = req.customer;
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    res.json({ message: "Profile fetched successfully", customer });
  } catch (err) {
    console.error("❌ getProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ["password", "otp"] },
    });
    res.json({
      message: "All customers fetched successfully",
      total: customers.length,
      customers,
    });
  } catch (err) {
    console.error("❌ getAllCustomers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
