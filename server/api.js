/* eslint no-restricted-syntax: 0*/
/* eslint guard-for-in: 0*/
const Router = require('express').Router;
const router = new Router();
const Users = require('./database/Users');
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
  res.json({ success: true });
});

router.get('/getGroupList/:username', (req, res) => {
  res.json({ groupList: ['g1', 'g2'] });
});

router.post('/getGroupFriends', (req, res) => {
  res.json({ groupFriends: ['f1', 'f2'] });
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
module.exports = router;
