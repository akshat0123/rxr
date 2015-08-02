var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/propaganda', function(req, res, next) {
	res.render('propaganda');
});

router.get('/gear', function(req, res, next) {
	res.render('gear');
});

router.get('/blog', function(req, res, next) {
	res.render('blog');
});

router.get('/cart', function(req, res, next) {
	res.render('cart');
});

router.get('/login', function(req, res, next) {
	res.render('login', { message: null } );
});

module.exports = router;
