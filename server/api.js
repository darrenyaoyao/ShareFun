const Router = require('express').Router;
const fs = require('fs');
const router = new Router();

router.post('/login', function(req, res){
  // code for discussion with db
	res.json({success: true})
})

module.exports = router;
