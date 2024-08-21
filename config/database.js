const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bdgino.sqlite', 
});

module.exports = sequelize;
