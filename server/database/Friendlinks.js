const Sequelize = require('sequelize');
const sequelize = require("../database");
const User = require("./Users")

var FriendLink = sequelize.define('friendlink', {
   user_1: Sequelize.INTEGER,
   user_2: Sequelize.INTEGER,
});

User.hasMany(FriendLink, { foreignKey: 'user_1_id'})

FriendLink.sync().then(function () {
  // Table created
  console.log("Create friendlink table successfully.")
}).catch(function(err){
   console.log("Create friendlink table fail: ");
   console.log(err)
});

module.exports = FriendLink;