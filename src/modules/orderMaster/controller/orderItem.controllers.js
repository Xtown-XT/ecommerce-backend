// src/modules/order/controllers/orderItem.controller.js
import * as service from "../service/orderItem.service.js";
import {
  createOrderItemSchema,
  updateOrderItemSchema,
  idParamSchema,
} from "../../orderMaster/dto/orderItem.validations.js";

export async function createOrderItem(req, res) {
  try {
    const parse = createOrderItemSchema.parse(req.body);
    const created = await service.createOrderItem(parse);
    return res.status(201).json({ status: "success", data: created });
  } catch (error) {
    // validation errors from zod have .issues
    if (error?.issues) {
      return res.status(400).json({ status: "error", message: "Validation failed", details: error.issues });
    }
    console.error("createOrderItem error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function getOrderItems(req, res) {
  try {
    const { limit, offset } = req.query;
    const items = await service.getAllOrderItems({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    return res.status(200).json({ status: "success", data: items });
  } catch (error) {
    console.error("getOrderItems error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function getOrderItem(req, res) {
  try {
    const params = idParamSchema.parse(req.params);
    const item = await service.getOrderItemById(params.order_item_id);
    if (!item) return res.status(404).json({ status: "error", message: "Order item not found" });
    return res.status(200).json({ status: "success", data: item });
  } catch (error) {
    if (error?.issues) {
      return res.status(400).json({ status: "error", message: "Invalid id param", details: error.issues });
    }
    console.error("getOrderItem error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function updateOrderItemController(req, res) {
  try {
    const params = idParamSchema.parse(req.params);
    const updates = updateOrderItemSchema.parse(req.body);
    const updated = await service.updateOrderItem(params.order_item_id, updates);
    if (!updated) return res.status(404).json({ status: "error", message: "Order item not found" });
    return res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    if (error?.issues) {
      return res.status(400).json({ status: "error", message: "Validation failed", details: error.issues });
    }
    console.error("updateOrderItem error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function deleteOrderItemController(req, res) {
  try {
    const params = idParamSchema.parse(req.params);
    const deletedCount = await service.deleteOrderItem(params.order_item_id);
    if (!deletedCount) return res.status(404).json({ status: "error", message: "Order item not found" });
    return res.status(200).json({ status: "success", message: "Deleted" });
  } catch (error) {
    if (error?.issues) {
      return res.status(400).json({ status: "error", message: "Invalid id param", details: error.issues });
    }
    console.error("deleteOrderItem error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

