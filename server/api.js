/* eslint no-restricted-syntax: 0*/
/* eslint guard-for-in: 0*/
const Router = require('express').Router;
const router = new Router();
const Promise = require('bluebird');
const Users = require('./database/Users').User;
const Groups = require('./database/Users').Group;
const Friendlinks = require('./database/Friendlinks');
const GroupRepay = require('./database/GroupRepay');
const GroupDebt = require('./database/GroupDebtLinks');
const DebtDebtor = require('./database/DebtDebtorLinks');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const log = (inst) => {
//  console.dir(inst.get());
// };

router.post('/login', (req, res) => {
  // code for discussion with db
  Users.findOneuser(req.body.username)
  .then((user) => {
    bcrypt.compare(req.body.password, user.password, (err, resP) => {
      if (resP) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
  }).catch(() => {
    res.json({ success: true });
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        // Store hash in your password DB.
        Users.create({
          username: req.body.username,
          password: hash,
        });
      });
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
          console.log(typeof(x.createdAt));
          debtList.push({
            debtName: x.debt,
            createdAt: x.createdAt,
            creditor: x.creditor,
            debtorList,
          });
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

function getdebtslist(groupdebts) {
  console.log("getdebtslist", groupdebts);
  return Promise.map(groupdebts, groupdebt => groupdebt.getDebtDebtors());
}

function flat(DebtDebtors) {
  console.log('flat', DebtDebtors);
  return new Promise((resolve) => {
    const debt = [];
    DebtDebtors.forEach(x => {
      x.forEach(y => {
        debt.push(y);
      });
    });
    return resolve(debt);
  });
}

function flat2(debts) {
  console.log('flat2', debts);
  return new Promise((resolve) => {
    const list = [];
    debts.forEach(x => {
      list.push(x);
    });
    return resolve(list);
  });
}

function debtcount(debtslist) {
  console.log("debtcount", debtslist);
  return new Promise((resolve) => {
    const debtrelation = {};
    debtslist.forEach(debt => {
      if (debtrelation[debt.creditor] === undefined) {
        debtrelation[debt.creditor] = debt.money;
      } else {
        debtrelation[debt.creditor] += debt.money;
      }
      if (debtrelation[debt.debtor] === undefined) {
        debtrelation[debt.debtor] = -debt.money;
      } else {
        debtrelation[debt.debtor] -= debt.money;
      }
    });
    return resolve(debtrelation);
  });
}

function debtgreedy(debtrelation) {
  const drelation = debtrelation;
  console.log("debtrelation", debtrelation);
  return new Promise((resolve) => {
    const repayrelation = [];
    for (var index in drelation) {
      console.log(index, drelation[index]);
      if (drelation[index] < 0) { //欠錢的人
        for (var i in drelation) {
          if (drelation[i] > 0 && (drelation[index] + drelation[i]) <= 0) {
            console.log(i, drelation[i]);
            repayrelation.push({
              creditor: i,
              debtor: index,
              money: drelation[i],
            });
            drelation[index] += drelation[i];
            drelation[i] = 0;
          } else if (drelation[i] > 0 && (drelation[index] + drelation[i]) > 0) {
            console.log(i, drelation[i]);
            repayrelation.push({
              creditor: i,
              debtor: index,
              money: -drelation[index],
            });
            drelation[i] += drelation[index];
            drelation[index] = 0;
          }
        }
      }
    }
    return resolve(repayrelation);
  });
}

function addrepay(repayrelations, groupname) {
  console.log("addrepay", repayrelations);
  return Promise.map(repayrelations,
    repayrelation => GroupRepay.create({
      group: groupname,
      creditor: repayrelation.creditor,
      debtor: repayrelation.debtor,
      money: repayrelation.money,
    }));
}

function repayfilter(repayrelations, username) {
  console.log("repayfilter", repayrelations);
  const userrepay = [];
  repayrelations.forEach(repayrelation => {
    if (repayrelation.creditor === username) {
      userrepay.push({
        debtor: repayrelation.debtor,
        money: repayrelation.money,
      });
    } else if (repayrelation.debtor === username) {
      userrepay.push({
        debtor: repayrelation.creditor,
        money: -repayrelation.money,
      });
    }
  });
  return userrepay;
}

router.get('/getGroupRepay/:username&&:groupName', (req, res) => {
  Groups.findOneGroup(req.params.groupName)
    .then(group => group.getGroupDebts())
    .then(GroupDebts => getdebtslist(GroupDebts))
    .then(DebtDebtors => flat(DebtDebtors))
    .then(Debts => flat2(Debts))
    .then(Debtlists => debtcount(Debtlists))
    .then(debtrelation => debtgreedy(debtrelation))
    .then(repayrelations => {
      res.json({ groupRepay: repayfilter(repayrelations, req.params.username) });
      return addrepay(repayrelations, req.params.groupName);
    })
    .catch(emptylist => {
      console.log('Group donot have debtslisy', emptylist);
      res.json({ groupRepay: [] });
    });
});

module.exports = router;
