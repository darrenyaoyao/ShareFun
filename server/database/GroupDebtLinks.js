/* eslint no-console: 0*/
const Sequelize = require('sequelize');
const sequelize = require('../database');
const Group = require('./Users').Group;

const GroupDebt = sequelize.define('groupDebt', {
  group: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  debt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creditor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Group.hasMany(GroupDebt, { foreignKey: 'group_id' });

GroupDebt.sync().then(() => {
  console.log('Create groupDebt table successfully.');
}).catch((err) => {
  console.log('Create groupDebt table fail: ', err);
});

module.exports = GroupDebt;
