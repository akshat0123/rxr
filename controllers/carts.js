var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/addToCart/:item_id', function(req, res, next) {
	if (!req.session.uid || req.session.uid === null) {
		res.render('login', { 
			isAuthenticated: req.isAuthenticated(),
			message: 'You must login to add items to your cart'
		});
	} else {
		models.Cart
			.find({ where: { uid: req.session.uid, iid: req.params.item_id }})
			.then(function(item) {
				if (item) {
					item.increment('quantity').then(function() {
						res.render('home', { isAuthenticated: req.isAuthenticated() });
					});
				} else {
					models.Cart
					.create({ uid: req.session.uid, iid: req.params.item_id, quantity: 1 })
					.then(function() {
						res.render('home', { isAuthenticated: req.isAuthenticated() });
					});
				}
		});
	}
});

module.exports = router;
