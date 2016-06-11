const Router = require('express').Router;
const fs = require('fs');
const router = new Router();

router.post('/login', function(req, res){
  // code for discussion with db
	// fail if no such user
	res.json({success: true})
})

router.post('/addDebt', function(req, res){
	// code for discussion with db
	console.log(req.body);
  res.json({success: true})
})

module.exports = router;
