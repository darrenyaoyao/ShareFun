/* eslint no-console: 0*/
const Sequelize = require('sequelize');
const sequelize = require('../database');
const GroupDebt = require('./GroupDebtLinks');

const DebtDebtor = sequelize.define('debtDebtor', {
  debt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creditor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  debtor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  money: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

GroupDebt.hasMany(DebtDebtor, { foreignKey: 'debt_id' });

DebtDebtor.sync().then(() => {
  console.log('Create debtDebtor table successfully.');
}).catch((err) => {
  console.log('Create debtDebtor table fail: ', err);
});

module.exports = DebtDebtor;
