/* eslint no-console: 0*/
const Sequelize = require('sequelize');
const sequelize = require('../database');
const GroupDebt = require('./GroupDebtLinks');

const DebtDebtor = sequelize.define('debtDebtor', {
  debt: Sequelize.STRING,
  creditor: Sequelize.STRING,
  debtor: Sequelize.STRING,
  money: Sequelize.INTEGER,
});

GroupDebt.hasMany(DebtDebtor, { foreignKey: 'debt_id' });

DebtDebtor.sync().then(() => {
  console.log('Create debtDebtor table successfully.');
}).catch((err) => {
  console.log('Create debtDebtor table fail: ', err);
});

module.exports = DebtDebtor;
