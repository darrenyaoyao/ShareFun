const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users');
const Friendlinks = require('./database/Friendlinks');

router.post('/login', (req, res) => {
  // code for discussion with db
  Users.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (user.password === req.body.password) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }).catch((err) => {
    res.json({ success: true, error: err });
    Users.create({
      username: req.body.username,
      password: req.body.password,
    });
  });
});

router.post('/addFriend', (req, res) => {
  // code for discussion with db
  Friendlinks.create({
    user_1: 'yaoyao',
    user_2: req.body.friendname,
  }).then((friendlink) => {
    Users.findOne({
      where: { username: 'yaoyao' },
    }).then((user) => {
      user.addFriendlink(friendlink);
    });
  });

  res.json({ success: true });
});

router.post('/addDebt', (req, res) => {
	// code for discussion with db
  res.json({ success: true });
});

router.post('/addGroup', (req, res) => {
	// code for discussion with db
  res.json({ success: true });
});

router.get('/getGroupList/:username', (req, res) => {
  res.json({ groupList: [{ groupName: 'testGroup',
                           groupFriends: ['f1', 'f2'] }] });
});

module.exports = router;
