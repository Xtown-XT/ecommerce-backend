import Order from "../models/order.model.js";

export const createOrder = async (data) => {
  return await Order.create(data);
};

export const getAllOrders = async () => {
  return await Order.findAll();
};

export const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

export const updateOrder = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found");
  return await order.update(data);
};

export const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found");
  return await order.destroy();
};
