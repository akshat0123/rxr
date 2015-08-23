var pg = require('pg');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/rxr');

var Cart = sequelize.define('cart', {
	uid: Sequelize.INTEGER,
	iid: Sequelize.INTEGER,
	quantity: Sequelize.INTEGER
});

Cart.sync();

function getCartByUid(uid, done) {
	Cart.findAll({ 
		where: { uid: uid },
		attributes: ['iid']
	}).then(function(iids) {
		var iids_list = [];
		for(var i=0;i<iids.length;i++) { 
			iids_list.push(iids[i].iid); 
		}
		done(iids_list);
	});
}

function addToCart(uid, iid, done){
	Cart.find({ where: { uid: uid, iid: iid} }).then(function(item) {
		if (item) {
			item.increment('quantity');
			done(item);
		} else {
			var cartItem = Cart.create({ uid: uid, iid: iid, quantity: 1 });
			done(cartItem);
		}
	});
}

module.exports = {
	getCartByUid: getCartByUid,
	addToCart: addToCart
}
