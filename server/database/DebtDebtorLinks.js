/* eslint no-console: 0*/
const Sequelize = require('sequelize');
const sequelize = require('../database');
const GroupDebtLink = require('./GroupDebtLinks');

const DebtDebtorLink = sequelize.define('debtDebtorLink', {
  debt: Sequelize.STRING,
  debtor: Sequelize.STRING,
  money: Sequelize.INTEGER,
});

GroupDebtLink.hasMany(DebtDebtorLink, { foreignKey: 'debt_id' });

DebtDebtorLink.sync().then(() => {
  console.log('Create debtDebtorLink table successfully.');
}).catch((err) => {
  console.log('Create debtDebtorLink table fail: ', err);
});

module.exports = DebtDebtorLink;
