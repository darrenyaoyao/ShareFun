/* eslint no-restricted-syntax: 0*/
/* eslint guard-for-in: 0*/
const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users').User;
const Groups = require('./database/Users').Group;
const Friendlinks = require('./database/Friendlinks');
const GroupDebtLinks = require('./database/GroupDebtLinks');
const DebtDebtorLinks = require('./database/DebtDebtorLinks');

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
  Groups.findOneGroup(req.body.groupName)
    .then((group) => {
      GroupDebtLinks.create({
        group: req.body.groupName,
        debt: req.body.debtContent.debtName,
        creditor: req.body.debtContent.creditor,
        time: req.body.debtContent.time,
      }).then((groupDebtLink) => {
        group.addGroupDebtLink(groupDebtLink);
        for (const x in req.body.debtContent.debtorList) {
          DebtDebtorLinks.create({
            debt: req.body.debtContent.debtName,
            debtor: x.debtor,
            money: x.money,
          }).then((debtDebtorLink) => {
            groupDebtLink.addDebtDebtorLink(debtDebtorLink);
          });
        }
      });
      res.json({ success: true });
    }).catch(() => {
      res.json({ success: false });
    });
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
  const debtList = [];
  Groups.findOneGroup(req.params.groupName)
  .then((group) => {
    group.getGroupDebtLinks();
  }).then((debts) => {
    for (const x in debts) {
      const debtorList = [];
      x.getDebtDebtorLinks()
       .then((debtors) => {
         for (const y in debtors) {
           debtorList.push({
             debtor: y.debtor,
             money: y.money,
           });
         }
       });
      debtList.push({
        creditor: x.creditor,
        debtName: x.debt,
        time: x.time,
        debtorList,
      });
    }
    res.json({ debtList });
  });
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

const fakeRepay = [
  { debtor: 'user1', money: 50 },
  { debtor: 'user2', money: 80 },
];

router.get('/getGroupRepay/:username&&:groupName', (req, res) => {
  res.json({ groupRepay: fakeRepay });
});

module.exports = router;
