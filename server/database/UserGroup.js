const Sequelize = require('sequelize');
const sequelize = require('../database');

// UserGroup
const UserGroup = sequelize.define('usergroup', {
  //groupId: Sequelize.INTEGER,
  //userId: Sequelize.INTEGER,
});

UserGroup.sync({ force: true }).then(() => {
  // Table created
  console.log('Create UserGroup table successfully.');
}).catch((err) => {
  console.log('Create UserGroup table fail: ', err);
});

module.exports = UserGroup;
