import User from "../models/customer";

// =======================
// 🔐 AUTH / OTP SERVICES
// =======================

// Generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @desc Create or update OTP for given phone
 */
export const sendOtpService = async (phone) => {
  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

  let user = await User.findOne({ where: { phone } });

  if (!user) {
    user = await User.create({ phone, otp, otpExpiresAt });
  } else {
    await user.update({ otp, otpExpiresAt });
  }

  // In real life, send OTP via SMS (Twilio, Fast2SMS, etc.)
  return { otp, user };
};

/**
 * @desc Verify OTP
 */
export const verifyOtpService = async (phone, otp) => {
  const user = await User.findOne({ where: { phone } });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp) throw new Error("Invalid OTP");
  if (new Date() > user.otpExpiresAt) throw new Error("OTP expired");

  await user.update({ isVerified: true, otp: null, otpExpiresAt: null });
  return user;
};

// =======================
// 👤 PROFILE / CRUD SERVICES
// =======================

/**
 * @desc Update user profile
 */
export const updateProfileService = async (phone, data) => {
  const user = await User.findOne({ where: { phone, isVerified: true } });
  if (!user) throw new Error("User not verified or not found");

  await user.update(data);
  return user;
};

/**
 * @desc Get all users
 */
export const getAllUsersService = async () => {
  const users = await User.findAll();
  return users;
};

/**
 * @desc Get user by ID
 */
export const getUserByIdService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return user;
};

/**
 * @desc Delete user
 */
export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return { message: "User deleted successfully" };
};
