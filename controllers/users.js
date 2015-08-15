var express = require('express');
var router = express.Router();

var db = require('../models/user');

router.post('/login', function(req, res, next) {
	db.passport.authenticate('local', function(err, user, info) {
		if (err) { next(err); }
		if (!user) { 
			req.session.message = info.message;
			res.render('login', { 
				isAuthenticated: req.isAuthenticated(), 
				message: req.session.message 
			}); 
		}
		else { 
			req.login(user, function(err) {
				if (err) { next(err); }
				else { 
					res.render('home', { isAuthenticated: req.isAuthenticated() }); 
				}
			});
		} 
	})(req, res, next);
});

router.post('/createUser', function(req, res, next) {
	if (req.body.password !== req.body.confirm_password) {
		res.render('login', { 
			isAuthenticated: req.isAuthenticated(),
			message: 'Passwords don\'t match'
		});
	} else {
		db.createUser(req.body.username, req.body.password, function(success, user, info) {
			if (!success) {
				res.render('login', { 
					isAuthenticated: req.isAuthenticated(),
					message: info.message 
				});
			} else {
				res.render('home', { isAuthenticated: req.isAuthenticated() });
			}
		});
	}
});

router.get('/logout', function(req, res) {
	req.logout();
	res.render('home', { isAuthenticated: req.isAuthenticated() });
});

module.exports = router;
