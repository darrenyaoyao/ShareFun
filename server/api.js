const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users');
const Friendlinks = require('./database/Friendlinks');

router.post('/login', (req, res) => {
  // code for discussion with db
  Users.findOneuser(req.body.username)
  .then((user) => {
    if (user.password === req.body.password) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }).catch(() => {
    res.json({ success: true });
    Users.create({
      username: req.body.username,
      password: req.body.password,
    });
  });
});

router.post('/addFriend', (req, res) => {
  // code for discussion with db
  Users.findOneuser(req.body.friendname)
    .then((friend) => {
      Friendlinks.create({
        user_1: req.body.friendname,
        user_2: req.body.username,
      }).then((friendlink) => {
        friend.addFriendlink(friendlink);
      });

      Friendlinks.create({
        user_1: req.body.username,
        user_2: req.body.friendname,
      }).then((friendlink) => {
        Users.findOneuser(req.body.username)
        .then((user) => {
          user.addFriendlink(friendlink);
        });
      });
      res.json({ success: true });
    }).catch(() => {
      res.json({ success: false });
    });
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
