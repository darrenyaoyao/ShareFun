const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./Users');
const UserGroup = require('./UserGroup');

const Group = sequelize.define('group', {
  groupName: Sequelize.STRING,
});

//Group.hasMany(UserGroup, { foreignKey: 'group_id' });

//  UserGroup
//const UserGroup = sequelize.define('user_group', {
//  role: Sequelize.STRING,
//});


// UserGroup
/*
const UserGroup = sequelize.define('usergroup', {
  groupId: Sequelize.STRING,
  userId: Sequelize.STRING,
});

UserGroup.sync().then(() => {
  // Table created
  console.log('Create UserGroup table successfully.');
}).catch((err) => {
  console.log('Create UserGroup table fail: ', err);
});
*/

Group.belongsToMany(User, {
  through: UserGroup,
  //foreignKey: 'group_user',
});
User.belongsToMany(Group, {
  through: UserGroup,
  //foreignKey: 'user_group',
});


Group.sync({ force: true }).then(() => {
  // Table created
  console.log('Create group table successfully.');
}).catch((err) => {
  console.log('Create group table fail: ', err);
});

module.exports = Group;
