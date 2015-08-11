var express = require('express');
var router = express.Router();

var db = require('../models/user');

var sess;

router.post('/addUser', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.newuseremail;
	var password = req.body.newuserpassword;
	var retypepassword = req.body.retypepassword;
	sess = req.session;
	if (password !== retypepassword) {
		res.render('login', { message: 'Passwords don\'t match' } );
	} else {
		db.addUser(firstname, lastname, email, password, function(result) {
			res.render('home', { session: sess });
		});
	}
});

router.post('/login', function(req, res) {
	var email = req.body.olduseremail;
	var password = req.body.olduserpassword;
	sess = req.session;
	db.login(email, password, function(result) {
		if (result === true) { 
			req.session.username = email;
			res.render('home', { session: sess }); 
		}
		else { res.render('login', { message: 'No such account'}); }
	});
});

module.exports = router;
