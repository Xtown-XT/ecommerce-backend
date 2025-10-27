import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js"; // make sure your db connection is exported from here
import customer from "../../customer/models/customer.js"; 

const Notification = sequelize.define("Notification", {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "customer",
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
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "notifications",
  timestamps: false,
  paranoid:true,
});

Notification.belongsTo(customer, { foreignKey: "id" });
customer.hasMany(Notification, { foreignKey: "id" });

export default Notification;
