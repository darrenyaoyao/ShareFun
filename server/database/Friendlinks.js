const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./Users').User;

const FriendLink = sequelize.define('friendlink', {
  user_1: { type: Sequelize.STRING, unique: 'Friends' },
  user_2: { type: Sequelize.STRING, unique: 'Friends' },
});

User.hasMany(FriendLink, { foreignKey: 'user_1_id' });

FriendLink.sync().then(() => {
  // Table created
  console.log('Create friendlink table successfully.');
}).catch((err) => {
  console.log('Create friendlink table fail: ', err);
});

module.exports = FriendLink;
