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

router.get('getItemById', function(req, res, next) {

});

module.exports = router;
