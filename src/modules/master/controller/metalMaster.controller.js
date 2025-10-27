import { createMetalSchema,updateMetalSchema } from "../dto/metalMaster.validations.js";
import * as metalService from "../service/metalMaster.service.js";

export const createMetal = async (req, res) => {
  try {
    const validatedData = createMetalSchema.parse(req.body);
    const metal = await metalService.createMetal(validatedData);
    res.status(201).json({ message: "Metal created successfully", data: metal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMetals = async (req, res) => {
  try {
    const metals = await metalService.getAllMetals();
    res.json(metals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMetalById = async (req, res) => {
  try {
    const metal = await metalService.getMetalById(req.params.id);
    if (!metal) return res.status(404).json({ message: "Metal not found" });
    res.json(metal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMetal = async (req, res) => {
  try {
    const validatedData = updateMetalSchema.partial().parse(req.body);
    const metal = await metalService.updateMetal(req.params.id, validatedData);
    if (!metal) return res.status(404).json({ message: "Metal not found" });
    res.json({ message: "Metal updated successfully", data: metal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMetal = async (req, res) => {
  try {
    const metal = await metalService.deleteMetal(req.params.id);
    if (!metal) return res.status(404).json({ message: "Metal not found" });
    res.json({ message: "Metal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
