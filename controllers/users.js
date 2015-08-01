var express = require('express');
var router = express.Router();

var db = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser', function(req, res, next) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var retypepassword = req.body.retypepassword;
	db.addUser(firstname, lastname, email, password, function(result) {
		
	});
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
}

module.exports = router;
