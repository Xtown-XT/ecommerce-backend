import User from "../models/customer.js";
import { profileSchema } from "../dto/authValidations.js";

export const updateProfile = async (req, res) => {
  try {
    const { phone } = req.body; // assuming phone identifies user
    const data = profileSchema.parse(req.body);

    const user = await User.findOne({ where: { phone, isVerified: true } });
    if (!user) return res.status(404).json({ message: "User not verified" });

    await user.update(data);
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CRUD example: get all users
export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: "User deleted" });
};
