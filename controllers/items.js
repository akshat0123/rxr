var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/getAllItems', function(req, res, next) {
	// db.getAllItems(function(items) {
	// 	res.render('gear', { 
	// 		isAuthenticated: req.isAuthenticated(), 
	// 		items: items 
	// 	});
	// });
});

router.get('/getItemPageById/:item_id', function(req, res, next) {
	models.Item.findById(req.params.item_id).then(function(item) {
		res.render('item', {
			isAuthenticated: req.isAuthenticated(),
			item: item
		});
	});
});

module.exports = router;
