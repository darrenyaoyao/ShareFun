const Sequelize = require('sequelize');
const sequelize = require('../database');
const Group = require('./Users').User;

const GroupRepay = sequelize.define('groupRepay', {
  group: Sequelize.STRING,
  creditor: Sequelize.STRING,
  debtor: Sequelize.STRING,
  money: Sequelize.INTEGER,
});

Group.hasMany(Grouprepay, { foreignKey: 'group_id' });

Grouprepay.sync().then(() => {
  // Table created
  console.log('Create friendlink table successfully.');
}).catch((err) => {
  console.log('Create friendlink table fail: ', err);
});

module.exports = Grouprepay;