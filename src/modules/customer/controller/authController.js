// import User from "../models/customer.js";
// import { phoneSchema, otpSchema } from "../dto/authValidations.js";


// // Generate random 6-digit OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Register/Login with phone number
// export const registerOrLogin = async (req, res) => {
//   try {
//     const { phone } = phoneSchema.parse(req.body);
//     const otp = generateOtp();
//     const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

//     let user = await User.findOne({ where: { phone } });

//     if (!user) {
//       user = await User.create({ phone, otp, otpExpiresAt });
//     } else {
//       await user.update({ otp, otpExpiresAt });
//     }

//     // (In real app, send OTP via SMS)
//     res.status(200).json({ message: "OTP sent", otp }); // show OTP for testing
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { phone, otp } = otpSchema.parse(req.body);
//     const user = await User.findOne({ where: { phone } });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (new Date() > user.otpExpiresAt)
//       return res.status(400).json({ message: "OTP expired" });

//     await user.update({ isVerified: true, otp: null, otpExpiresAt: null });
//     res.json({ message: "OTP verified successfully", user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// import Customer from "../models/customer.js";
// import { generateOTP, hashPassword } from "../../../utils/auth.js";
// import { sendEmailOTP, sendSMSOTP } from "../../../utils/sendOTP.js";
// import { generateToken } from "../../../utils/jwt.js";
// // import { updateProfileSchema } from "./customer.zod.js";

// // Request OTP
// export const requestOTP = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     if ( !phone) return res.status(400).json({ message: "Email or phone required" });

//     let customer = await Customer.findOne({ where: {  phone, phone: phone } });
//     if (!customer) {
//       const password = generateOTP();
//       customer = await Customer.create({  phone, password: await hashPassword(password) });
//     }

//     const otp = generateOTP();
//     const expiry = new Date(Date.now() + 5 * 60 * 1000);
//     await customer.update({ otp, otp_expiry: expiry, is_verified: false });

//     // if (email) await sendEmailOTP(email, otp);
//     if (phone) await sendSMSOTP(phone, otp);

//     res.json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const verifyOTP = async (req, res) => {
//   try {
//     const {  phone, otp } = req.body;
//     if (!otp || ( !phone))
//       return res.status(400).json({ message: "Invalid request" });

//     // find customer by email or phone
//     const customer = await Customer.findOne({
//       where: {   phone: phone || null },
//     });
//     if (!customer)
//       return res.status(404).json({ message: "Customer not found" });

//     // check OTP
//     if (customer.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     // check OTP expiry (fix field name)
//     if (customer.otpExpiry && new Date() > customer.otpExpiry)
//       return res.status(400).json({ message: "OTP expired" });

//     // update verification status (fix field name)
//     await customer.update({
//       isVerified: true,
//       otp: null,
//       otpExpiry: null,
//     });

//     const token = generateToken({ id: customer.id });
//     res.json({ message: "OTP verified successfully", token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const updateProfile = async (req, res) => {
//   try {
//     const customer = req.customer;

//     // ✅ Fix: use isVerified instead of is_verified
//     if (!customer.isVerified) {
//       return res.status(403).json({ message: "Customer not verified" });
//     }

//     await customer.update(req.body);
//     res.json({ message: "Profile updated successfully", customer });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // ✅ Get logged-in customer's profile
// export const getProfile = async (req, res) => {
//   try {
//     const customer = req.customer;

//     if (!customer)
//       return res.status(404).json({ message: "Customer not found" });

//     res.json({
//       message: "Profile fetched successfully",
//       customer,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get all customers (admin purpose)
// export const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.findAll({
//       attributes: {
//         exclude: ["password", "otp"], // don’t return sensitive info
//       },
//     });

//     res.json({
//       message: "All customers fetched successfully",
//       total: customers.length,
//       customers,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import Customer from "../models/customer.js";
import { generateOTP, hashPassword } from "../../../utils/auth.js";
import { sendEmailOTP, sendSMSOTP } from "../../../utils/sendOTP.js";
import { generateToken } from "../../../utils/jwt.js";

// Request OTP
export const requestOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    let customer = await Customer.findOne({ where: { phone } });

    // Create customer if not exist
    if (!customer) {
      const password = generateOTP();
      customer = await Customer.create({
        phone,
        password: await hashPassword(password),
      });
    }

    // Generate OTP and expiry
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await customer.update({
      otp,
      otpExpiry: expiry,
      verifyOtp: false,
    });

    // Send OTP via SMS
    // await sendSMSOTP(phone, otp);

    res.json({ message: "OTP sent successfully",otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP required" });

    const customer = await Customer.findOne({ where: { phone } });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Check OTP
    if (customer.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    // Check expiry
    if (customer.otpExpiry && new Date() > customer.otpExpiry)
      return res.status(400).json({ message: "OTP expired" });

    // Update verification status
    await customer.update({
      verifyOtp: true,
      otp: null,
      otpExpiry: null,
    });

    const token = generateToken({ id: customer.id });
    res.json({ message: "OTP verified successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const customer = req.customer;

    if (!customer.verifyOtp) {
      return res.status(403).json({ message: "Customer not verified" });
    }

    // Only allow updating certain fields
    const updatableFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "country",
      "state",
      "city",
      "pincode",
    ];

    const updateData = {};
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    await customer.update(updateData);
    res.json({ message: "Profile updated successfully", customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get logged-in customer's profile
export const getProfile = async (req, res) => {
  try {
    const customer = req.customer;
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json({ message: "Profile fetched successfully", customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all customers (admin purpose)
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
