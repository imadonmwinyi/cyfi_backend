const { DataTypes } = require('sequelize');
const sequelize = require('./db.config');

const Delegate = sequelize.define('Delegate', {
  fullname: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  camping: { type: DataTypes.STRING, allowNull: false },
  medical: { type: DataTypes.STRING, allowNull: false },
  province: { type: DataTypes.STRING, allowNull: false },
  branchName: { type: DataTypes.STRING, allowNull: false },
  paymentReference: { type: DataTypes.STRING, allowNull: true },
  paymentReceipt: { type: DataTypes.STRING, allowNull: true },
  paymentVerified: { type: DataTypes.STRING, defaultValue: 'pending' },
  dateRegistered: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  registeredBy: { type: DataTypes.STRING, allowNull: true },
  programType: { type: DataTypes.STRING, allowNull: true },
},{ timestamps: false });

module.exports = Delegate;