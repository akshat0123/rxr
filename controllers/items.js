var express = require('express');
var router = express.Router();

var db = require('../models/item');

router.get('/getAllItems', function(req, res, next) {
	db.getAllItems(function(items) {
		res.render('gear', { 
			isAuthenticated: req.isAuthenticated(), 
			items: items 
		});
	});
});

router.get('/getItemPageById/:item_id', function(req, res, next) {
	var item_id = req.params.item_id;

	db.getItemById(item_id, function(item) {
		res.render('item', {
			isAuthenticated: req.isAuthenticated(),
			item: item,
		});
	});

});

module.exports = router;
