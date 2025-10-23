import bcrypt from "bcryptjs";
import crypto from "crypto";

export function generateOTP(length = 6) {
  const max = 10 ** length;
  const num = crypto.randomInt(0, max).toString().padStart(length, "0");
  return num;
}


export async function hashOTP(otp) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(otp, salt);
}

export async function verifyOTP(otp, hash) {
  if (!hash) return false;
  return bcrypt.compare(otp, hash);
}
