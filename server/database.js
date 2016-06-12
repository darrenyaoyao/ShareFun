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

module.exports = sequelize;