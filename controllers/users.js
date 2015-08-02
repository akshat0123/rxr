var express = require('express');
var router = express.Router();

var db = require('../models/user');

router.post('/addUser', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.newuseremail;
	var password = req.body.newuserpassword;
	var retypepassword = req.body.retypepassword;
	if (password !== retypepassword) {
		res.render('login');
	} else {
		db.addUser(firstname, lastname, email, password, function(result) {
			res.render('home');
		});
	}
});

router.post('/login', function(req, res) {
	var email = req.body.olduseremail;
	var password = req.body.olduserpassword;
	db.login(email, password, function(result) {
		res.render('home');
	});
});

module.exports = router;
