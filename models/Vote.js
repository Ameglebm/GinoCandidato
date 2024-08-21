const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vote = sequelize.define('Vote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  candidate: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Gino', 
  },
}, {
  timestamps: true,
});

module.exports = Vote;
