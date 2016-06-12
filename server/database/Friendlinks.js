const Sequelize = require('sequelize');
const sequelize = require("../database");
const User = require("./Users")

var FriendLink = sequelize.define('friendlink');

FriendLink.belongsTo(User, {foreignKey: 'user_1'})
FriendLink.belongsTo(User, {foreignKey: 'user_2'})

FriendLink.sync().then(function () {
  // Table created
  console.log("Create friendlink table successfully.")
}).catch(function(err){
   console.log("Create friendlink table fail: ");
   console.log(err)
});

module.exports = FriendLink;