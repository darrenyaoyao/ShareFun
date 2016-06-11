const Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql', 'root', '123', {
   host: 'localhost',
   dialect: 'mysql'
}); 

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

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

module.exports = {sequelize: sequelize,
                  user: User
                  };