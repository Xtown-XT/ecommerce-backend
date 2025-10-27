import { Wishlist } from "../models/whristlist.js";

export const createWishlist = async (req, res) => {
  try {
    const { cust_id, product_id } = req.body;
    const newWishlist = await Wishlist.create({ cust_id, product_id });
    res.status(201).json({ status: "success", data: newWishlist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAllWishlists = async (req, res) => {
  try {
    const list = await Wishlist.findAll();
    res.json({ status: "success", data: list });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist)
      return res.status(404).json({ status: "error", message: "Wishlist not found" });
    res.json({ status: "success", data: wishlist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist)
      return res.status(404).json({ status: "error", message: "Wishlist not found" });

    await wishlist.update({ ...req.body, updated_at: new Date() });
    res.json({ status: "success", data: wishlist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist)
      return res.status(404).json({ status: "error", message: "Wishlist not found" });

    await wishlist.destroy();
    res.json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
