const Router = require('express').Router;
const fs = require('fs');
const router = new Router();
const Users = require("./database/Users");
const Friendlinks = require("./database/Friendlinks");

router.post('/login', function(req, res){
  // code for discussion with db
   Users.findOne({
      where: {username: req.body.username}
   }).then(function(user){
      if(user.password == req.body.password)
         res.json({success: true});
      else 
         res.json({success: false});
   }).catch(function(err){
      res.json({success: true});
      Users.create({
         username: req.body.username,
         password: req.body.password
      });
   });
})

router.post('/addFriend', function(req, res){
   // code for discussion with db
    console.log(req.body)
    Friendlinks.create({
      user_1: 'yaoyao',
      user_2: req.body.friendname
    }).then(function(friendlink){
      Users.findOne({
        where: {username: 'yaoyao'}
      }).then(function(user){
        user.addFriendlink(friendlink);
      });
    });

  res.json({success: true});
})

router.post('/addDebt', function(req, res){
	// code for discussion with db
  res.json({success: true});
})

router.post('/addGroup', function(req, res){
	// code for discussion with db
	res.json({success: true})
})

router.get('/getGroupList/:username', function(req, res){
  res.json({groupList:[{groupName: 'testGroup', groupFriends: ['f1', 'f2'] }]})
})

module.exports = router;
