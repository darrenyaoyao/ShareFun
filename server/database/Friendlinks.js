const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./Users');

const FriendLink = sequelize.define('friendlink', {
  user_1: Sequelize.STRING,
  user_2: Sequelize.STRING,
});

User.hasMany(FriendLink, { foreignKey: 'user_1_id' });

FriendLink.sync({ force: true }).then(() => {
  // Table created
  console.log('Create friendlink table successfully.');
}).catch((err) => {
  console.log('Create friendlink table fail: ', err);
});

module.exports = FriendLink;
