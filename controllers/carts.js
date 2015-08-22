var express = require('express');
var router = express.Router();

var db = require('../models/cart');
var db_item = require('../models/item');

router.get('/addToCart/:item_id', function(req, res, next) {
	if (!req.session.uid || req.session.uid === null) {
		res.render('login', { 
			isAuthenticated: req.isAuthenticated(),
			message: 'You must login to add items to your cart'
		});
	} else {
		db.addToCart(req.session.uid, req.params.item_id, function(cartItem) {
			console.log('Cart Item: ' + cartItem);
			db.getCartByUid(req.session.uid, function(iids) {
				db_item.getUserItems(iids, function(items) {
					res.render('cart', {
						isAuthenticated: req.isAuthenticated(),
						items: items
					});
				});
			});
		});
	}		
});

module.exports = router;
