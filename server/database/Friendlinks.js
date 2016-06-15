const Sequelize = require('sequelize');
const sequelize = require("../database");
const User = require("./Users")

var FriendLink = sequelize.define('friendlink', {
   user_1: Sequelize.STRING,
   user_2: Sequelize.STRING,
});

User.hasMany(FriendLink, { foreignKey: 'user_1_id'})

FriendLink.sync({force: true}).then(function () {
  // Table created
  console.log("Create friendlink table successfully.")
}).catch(function(err){
   console.log("Create friendlink table fail: ");
   console.log(err)
});

module.exports = FriendLink;