import { z } from "zod";

export const phoneSchema = z.object({
  phone: z.string().length(10, "Phone must be 10 digits"),
});

export const otpSchema = z.object({
  phone: z.string().length(10),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
