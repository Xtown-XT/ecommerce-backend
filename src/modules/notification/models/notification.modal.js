import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Customer from "../../customer/models/customer.js"; // adjust path

const Notification = sequelize.define(
  "Notification",
  {
    notification_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Customer, 
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "notifications",
    timestamps: false,
  }
);

// ✅ Association (if not already elsewhere)
Customer.hasMany(Notification, { foreignKey: "customer_id" });
Notification.belongsTo(Customer, { foreignKey: "customer_id" });

export default Notification;
