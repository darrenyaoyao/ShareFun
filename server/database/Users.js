const Sequelize = require('sequelize');
const sequelize = require("../database");

var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  }
});

User.sync().then(function () {
  // Table created
  console.log("Create user table successfully.")
}).catch(function(err){
   console.log("Create user table fail: ");
   console.log(err)
});

module.exports = User;