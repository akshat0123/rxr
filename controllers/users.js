var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/login', function(req, res, next) {
	models.User.passport().authenticate('local', function(err, user, info) {
		if (err) { next(err); }
		if (!user) { 
			res.render('login', { 
				isAuthenticated: req.isAuthenticated(), 
				message: info.message 
			}); 
		}
		else { 
			req.login(user, function(err) {
				if (err) { next(err); }
				else { 
					req.session.uid = user.id;
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
		models.User.find({ where: { username: req.body.username }}).then(function(user) {
			if (user) {
				res.render('login', {
					isAuthenticated: req.isAuthenticated(),
					message: 'User already exists'
				});
			} else {
				models.User.create({ username: req.body.username, password: req.body.password });
				res.render('home', { isAuthenticated: req.isAuthenticated() });
			}
		});
	}
});

router.get('/logout', function(req, res) {
	req.session.uid = null;
	req.logout();
	res.render('home', { isAuthenticated: req.isAuthenticated() });
});

module.exports = router;
