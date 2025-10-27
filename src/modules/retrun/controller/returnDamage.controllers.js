import ReturnDamage from "../models/retrunDamage.js";
import { createReturnDamageSchema,updateReturnDamageSchema } from "../dto/returnDamage.validations.js";

// Create
export const createReturnDamage = async (req, res) => {
  try {
    const validated = createReturnDamageSchema.parse(req.body);
    const record = await ReturnDamage.create(validated);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

// Get All
export const getAllReturnDamage = async (req, res) => {
  try {
    const records = await ReturnDamage.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One
export const getReturnDamageById = async (req, res) => {
  try {
    const record = await ReturnDamage.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateReturnDamage = async (req, res) => {
  try {
    const validated = updateReturnDamageSchema.partial().parse(req.body);
    const record = await ReturnDamage.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Not found" });
    await record.update(validated);
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

// Delete
export const deleteReturnDamage = async (req, res) => {
  try {
    const record = await ReturnDamage.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Not found" });
    await record.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
