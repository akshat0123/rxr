var express = require('express');
var router = express.Router();

var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.username = null;
	sess = req.session;
  res.render('home', { session: sess});
});

router.get('/propaganda', function(req, res, next) {
	sess = req.session;
	res.render('propaganda', { session: sess });
});

router.get('/gear', function(req, res, next) {
	sess = req.session;
	res.render('gear', { session: sess });
});

router.get('/blog', function(req, res, next) {
	sess = req.session;
	res.render('blog', { session: sess });
});

router.get('/cart', function(req, res, next) {
	sess = req.session;
	res.render('cart', { session: sess });
});

router.get('/login', function(req, res, next) {
	sess = req.session;
	res.render('login', { message: null, session: sess } );
});

router.get('/logout', function(req, res, next) {
	req.session.username = null;
	sess = req.session;
	res.render('home', { session: sess});
});

module.exports = router;
