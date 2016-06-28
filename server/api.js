/* eslint no-console: 0*/
const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users').User;
const Groups = require('./database/Users').Group;
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
  Users.findOne({
    where: { username: req.body.friendname },
  }).then((friend) => {
    console.log(friend);
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

router.get('/getFriendList/:username', (req, res) => {
  console.log(req.params.username);
  Users.findOneuser(req.params.username)
    .then((user) => {
      console.log('Find user');
      user.getFriendlinks()
      .then((friendlinks) => {
        const friends = friendlinks.map(friendlink => friendlink.user_2);
        res.json({ friendList: friends });
      });
    });
});

router.post('/addDebt', (req, res) => {
	// code for discussion with db
  res.json({ success: true });
});

router.post('/addGroup', (req, res) => {
	// code for discussion with db
  Groups.create({
    groupName: req.body.groupName,
  }).then((group) => {
    req.body.groupFriends.map(x => (
			Users.findOneuser(x)
      .then((user) => {
        group.addUser(user);
        user.addGroup(group);
      })
		));
    res.json({ success: true });
  }).catch(() => {
    res.json({ success: false });
  });
});

router.get('/getGroupList/:username', (req, res) => {
  Users.findOneuser(req.params.username)
    .then((user) => {
      const tmpList = [];
      user.getGroups()
        .then((groups) => {
          groups.forEach(x => {
            tmpList.push(x.groupName);
          });
          res.json({ groupList: tmpList });
        });
    }).catch(() => {
      res.json({ groupList: [] });
    });
});

router.post('/getGroupFriends', (req, res) => {
  Groups.findOneGroup(req.body.groupName)
    .then((group) => {
      const tmpList = [];
      group.getUsers()
        .then((members) => {
          // const filtered = members.filter(member => (member.username !== req.body.username));
          // filtered.forEach(y => console.log(y.username));
          members.forEach(x => {
            tmpList.push(x.username);
          });
          res.json({ groupFriends: tmpList });
        });
    });
});

router.get('/getDebtList/:username&&:groupName', (req, res) => {
  res.json({ debtList: [{
    creditor: 'albert',
    debtName: 'lunch',
    debtorList: [{ debtor: 'Tom', money: 100 }],
  }] });
});

const fakeList1 = [
  {
    groupName: 'fakeGroup1',
    debtorList: [
      {
        debtor: 'JR',
        money: 100,
      },
      {
        debtor: 'KD',
        money: 200,
      },
    ],
  },
];

router.post('/addRepay', (req, res) => {
  console.log(req.body);
  res.json({ repayList: fakeList1 });
});

const fakeList = [
  {
    groupName: 'fakeGroup1',
    debtorList: [
      {
        debtor: 'JR',
        money: 100,
      },
      {
        debtor: 'KD',
        money: 200,
      },
    ],
  },
  {
    groupName: 'fakeGroup2',
    debtorList: [
      {
        debtor: 'JR2',
        money: -100,
      },
      {
        debtor: 'KD2',
        money: -200,
      },
    ],
  },
];

router.get('/getRepayList/:username', (req, res) => {
  res.json({ repayList: fakeList });
});

module.exports = router;
