const Sequelize = require('sequelize');
const sequelize = require("../database");
const User = require("./Users")

var FriendLink = sequelize.define('friendlink', {
   user1: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
   }
});

FriendLink.belongsTo(User, {foreignKey: 'user_1', targetKey: 'user1'})
FriendLink.belongsTo(User, {foreignKey: 'user_2', targetKey: 'user2'})

FriendLink.sync({force: true}).then(function () {
  // Table created
  console.log("Create friendlink table successfully.")
}).catch(function(err){
   console.log("Create friendlink table fail: ");
   console.log(err)
});

module.exports = FriendLink;