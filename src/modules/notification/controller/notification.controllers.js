import Notification from "../models/notification.modal.js";
import { createNotificationSchema, updateNotificationSchema } from "../dto/notification.validations.js";

// Create notification
export const createNotification = async (req, res) => {
  try {
    const data = createNotificationSchema.parse(req.body);
    const notification = await Notification.create(data);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.errors || error.message });
  }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ status: "error", message: "Not found" });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update notification
export const updateNotification = async (req, res) => {
  try {
    const data = updateNotificationSchema.parse(req.body);
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ status: "error", message: "Not found" });
    await notification.update(data);
    res.json(notification);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.errors || error.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ status: "error", message: "Not found" });
    await notification.destroy();
    res.json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
