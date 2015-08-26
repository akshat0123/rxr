var pg = require('pg');
var cstr = 'postgres://postgres:postgres@localhost:5432/rxr';

module.exports = function(sequelize, DataTypes) {
	var Cart = sequelize.define("Cart", {
		uid: DataTypes.INTEGER,
		iid: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER	
	}, {
		classMethods : {
			getCart: function getCart(uid, cb) {
				pg.connect(cstr, function(err, client, done) {
					var str = 'select title, image, price, quantity from "Items" inner join "Carts" ' + 
										'on ("Items".id = "Carts".iid) where "Carts".uid = $1';
					client.query(str, [uid], function (err, result) {
						done();
						client.end();
						console.log('result: ' + result);
						cb(result.rows);
					});
				});
			}
		}
	});

	return Cart;
};
