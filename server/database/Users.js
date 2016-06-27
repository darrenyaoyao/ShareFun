const Sequelize = require('sequelize');
const sequelize = require('../database');
// const UserGroup = require('./UserGroup');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
}, {
  classMethods: {
    findOneuser: (username) => (
      User.findOne({
        where: { username },
      })
    ),
  },
});
const Group = sequelize.define('group', {
  groupName: Sequelize.STRING,
});
const UserGroup = sequelize.define('usergroup');

// User.hasMany(UserGroup, { foreignKey: 'user_id' });

Group.belongsToMany(User, {
  through: UserGroup,
  constraints: false,
  foreignKey: 'group_id',
});

User.belongsToMany(Group, {
  through: UserGroup,
  constraints: false,
  foreignKey: 'user_id',
});


User.sync().then(() => {
  // Table created
  console.log('Create user table successfully.');
}).catch((err) => {
  console.log('Create user table fail: ', err);
});
Group.sync({ force: true }).then(() => {
  // Table created
  console.log('Create group table successfully.');
}).catch((err) => {
  console.log('Create group table fail: ', err);
});

UserGroup.sync({ force: true }).then(() => {
  console.log('Create UserGroup table successfully.');
}).catch((err) => {
  console.log('Create UserGroup table fail: ', err);
});

module.exports = { User, Group };
