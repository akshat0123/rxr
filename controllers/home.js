var express = require('express');
var router = express.Router();
var db = require('../models/item');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { isAuthenticated: req.isAuthenticated() });
});

router.get('/propaganda', function(req, res, next) {
	res.render('propaganda', { isAuthenticated: req.isAuthenticated() });
});

router.get('/gear', function(req, res, next) {
	db.getAllItems(function(items) {
		res.render('gear', { 
			isAuthenticated: req.isAuthenticated(), 
			items: items 
		});
	});
});

router.get('/blog', function(req, res, next) {
	res.render('blog', { isAuthenticated: req.isAuthenticated() });
});

router.get('/cart', function(req, res, next) {
	res.render('cart', { isAuthenticated: req.isAuthenticated() });
});

router.get('/login', function(req, res, next) {
	res.render('login', { message: null, isAuthenticated: req.isAuthenticated() } );
});

module.exports = router;
