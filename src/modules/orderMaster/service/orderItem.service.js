// src/modules/order/services/orderItem.service.js
import OrderItem from "../models/orderItem.model.js";

/**
 * Helper: compute total price as unit_price * quantity
 * Ensure arithmetic uses Number conversions to avoid string concatenation.
 */
function computeTotal(unit_price, quantity) {
  const up = Number(unit_price);
  const q = Number(quantity);
  const total = up * q;
  // round to 2 decimal places (string -> Number)
  return Number(total.toFixed(2));
}

export async function createOrderItem(data) {
  // compute total_price before creating
  const total_price = computeTotal(data.unit_price, data.quantity);
  const payload = {
    ...data,
    unit_price: Number(data.unit_price),
    price: data.price !== undefined ? Number(data.price) : Number(data.unit_price),
    total_price,
    created_at: new Date(),
  };

  const created = await OrderItem.create(payload);
  return created;
}

export async function getAllOrderItems({ limit = 100, offset = 0 } = {}) {
  return OrderItem.findAll({ limit, offset, order: [["order_item_id", "ASC"]] });
}

export async function getOrderItemById(order_item_id) {
  return OrderItem.findOne({ where: { order_item_id } });
}

export async function updateOrderItem(order_item_id, updates = {}) {
  const record = await OrderItem.findOne({ where: { order_item_id } });
  if (!record) return null;

  const updatedValues = {};

  if (updates.quantity !== undefined) updatedValues.quantity = Number(updates.quantity);
  if (updates.unit_price !== undefined) updatedValues.unit_price = Number(updates.unit_price);
  if (updates.price !== undefined) updatedValues.price = Number(updates.price);

  // recompute total_price if quantity or unit_price changed
  const unitPrice = updatedValues.unit_price ?? record.unit_price;
  const quantity = updatedValues.quantity ?? record.quantity;
  updatedValues.total_price = computeTotal(unitPrice, quantity);
  updatedValues.updated_at = new Date();

  await record.update(updatedValues);
  return record;
}

export async function deleteOrderItem(order_item_id) {
  const deletedCount = await OrderItem.destroy({ where: { order_item_id } });
  return deletedCount; // returns number of rows deleted (0 or 1)
}
