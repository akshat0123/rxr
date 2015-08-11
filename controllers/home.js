var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.username = null;
  res.render('home');
});

router.get('/propaganda', function(req, res, next) {
	console.log('USERNAME (propaganda): ' + req.session.username);
	res.render('propaganda');
});

router.get('/gear', function(req, res, next) {
	console.log('USERNAME (gear): ' + req.session.username);
	res.render('gear');
});

router.get('/blog', function(req, res, next) {
	console.log('USERNAME (blog): ' + req.session.username);
	res.render('blog');
});

router.get('/cart', function(req, res, next) {
	console.log('USERNAME (cart): ' + req.session.username);
	res.render('cart');
});

router.get('/login', function(req, res, next) {
	console.log('USERNAME (login): ' + req.session.username);
	res.render('login', { message: null } );
});

module.exports = router;
