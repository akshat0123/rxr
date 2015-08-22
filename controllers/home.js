var express = require('express');
var router = express.Router();
var db_item = require('../models/item');
var db_cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
  res.render('home', { isAuthenticated: req.isAuthenticated() });
});

router.get('/propaganda', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
	res.render('propaganda', { isAuthenticated: req.isAuthenticated() });
});

router.get('/gear', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
	db_item.getAllItems(function(items) {
		res.render('gear', { 
			isAuthenticated: req.isAuthenticated(), 
			items: items
		});
	});
});

router.get('/blog', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
	res.render('blog', { isAuthenticated: req.isAuthenticated() });
});

router.get('/cart', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
	db_cart.getCartByUid(req.session.uid, function(iids) {
		db_item.getUserItems(iids, function(items) {
			res.render('cart', {
				isAuthenticated: req.isAuthenticated(),
				items: items
			});
		});
	});
});

router.get('/login', function(req, res, next) {
	if (req.session.uid) { console.log('User id: ' + req.session.uid); }
	res.render('login', { message: null, isAuthenticated: req.isAuthenticated() } );
});

module.exports = router;
