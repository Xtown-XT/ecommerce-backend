import MetalMaster from "../models/metalMaster.js";

export const createMetal = async (data) => {
  return await MetalMaster.create(data);
};

export const getAllMetals = async () => {
  return await MetalMaster.findAll();
};

export const getMetalById = async (id) => {
  return await MetalMaster.findByPk(id);
};

export const updateMetal = async (id, data) => {
  const metal = await MetalMaster.findByPk(id);
  if (!metal) return null;
  await metal.update(data);
  return metal;
};

export const deleteMetal = async (id) => {
  const metal = await MetalMaster.findByPk(id);
  if (!metal) return null;
  await metal.destroy();
  return metal;
};
