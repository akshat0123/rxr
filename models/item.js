var pg = require('pg');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/rxr');

var Item = sequelize.define('item', {
	title: Sequelize.STRING,
	image: Sequelize.STRING,
	price: Sequelize.STRING
});

Item.sync();

function getAllItems(done) {
	Item.findAll().then(function(items) {
		done(items);
	});
}

function getItemById(id, done) {
	Item.findById(id).then(function(item) {
		done(item);
	});
}

module.exports = {
	getAllItems: getAllItems,
	getItemById: getItemById
}
