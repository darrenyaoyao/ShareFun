/* eslint no-restricted-syntax: 0*/
/* eslint guard-for-in: 0*/
const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users').User;
const Groups = require('./database/Users').Group;
const Friendlinks = require('./database/Friendlinks');
const GroupDebt = require('./database/GroupDebtLinks');
const DebtDebtor = require('./database/DebtDebtorLinks');

// const log = (inst) => {
//  console.dir(inst.get());
// };

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
  if (req.body.username === req.body.friendname) {
    res.json({ err: 3 });
    return;
  }
  Users.findOne({
    where: { username: req.body.friendname },
  }).then((friend) => {
    if (!friend) {
      res.json({ err: 1 });
      return;
    }
    Friendlinks.create({
      user_1: req.body.friendname,
      user_2: req.body.username,
    }).then((friendlink) => {
      friend.addFriendlink(friendlink);
      res.json({ err: 0 });
    }).catch(() => {
      res.json({ err: 2 });
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
  }).catch(() => {
    res.json({ err: 2 });
  });
});

router.get('/getFriendList/:username', (req, res) => {
  Users.findOneuser(req.params.username)
    .then((user) => {
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
      GroupDebt.create({
        group: req.body.groupName,
        debt: req.body.debtContent.debtName,
        creditor: req.body.username,
      }).then((groupDebt) => {
        group.addGroupDebt(groupDebt);
        req.body.debtContent.debtorList.forEach(x => {
          DebtDebtor.create({
            debt: req.body.debtContent.debtName,
            creditor: req.body.debtContent.creditor,
            debtor: x.debtor,
            money: x.money,
          }).then((debtDebtor) => {
            groupDebt.addDebtDebtor(debtDebtor);
          });
        });
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
  const count = [];
  Groups.findOneGroup(req.params.groupName)
  .then((group) => {
    group.getGroupDebts()
    .then((debts) => {
      if (debts.length === 0) {
        // console.log('group has no debt');
        res.json({ debtList });
      }
      debts.forEach(x => {
        const debtorList = [];
        x.getDebtDebtors()
        .then((debtors) => {
          debtors.forEach(y => {
            debtorList.push({ debtor: y.debtor, money: y.money });
          });
          // console.log('~~~~~~~'); debtorList.forEach(z => { console.log(z); });
        }).then(() => {
          // console.log('1111'); debtorList.forEach(z => { console.log(z); });
          debtList.push({ debtName: x.debt, creditor: x.creditor, debtorList });
          // console.log('/////'); debtList.forEach(z => { console.log(z); });
          count.push(1);
          if (count.length === debts.length) { res.json({ debtList }); }
        });
      });
    })
    .catch(() => {
      res.json({ debtList });
    });
  })
  .catch(() => {
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
