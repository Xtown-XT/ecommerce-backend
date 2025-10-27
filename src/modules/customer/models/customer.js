// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Customer = sequelize.define("Customer", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   phone: {
//     type: DataTypes.STRING(15),
//     allowNull: false,
//     unique: true,
//   },
//   otp: DataTypes.STRING(6),
//   otpExpiry: DataTypes.DATE,
//   firstName: DataTypes.STRING,
//   lastName: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING,
//   address: DataTypes.STRING,
//   country: DataTypes.STRING,
//   state: DataTypes.STRING,
//   city: DataTypes.STRING,
//   pincode: DataTypes.STRING,
// });

// export default Customer;


import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  verifyOtp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
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
  timestamps: true,
  tableName: 'customer' ,
  paranoid:true,
});

export default Customer;
