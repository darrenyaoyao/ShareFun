/* eslint no-console: 0*/
const Sequelize = require('sequelize');
const sequelize = require('../database');

const GroupDebtLink = sequelize.define('groupDebtLink', {
  group: Sequelize.STRING,
  debt: Sequelize.STRING,
  time: Sequelize.STRING,
  creditor: Sequelize.STRING,
});

GroupDebtLink.sync().then(() => {
  console.log('Create groupDebtLink table successfully.');
}).catch((err) => {
  console.log('Create groupDebtLink table fail: ', err);
});

module.exports = GroupDebtLink;
