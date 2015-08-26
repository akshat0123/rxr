module.exports = function(sequelize, DataTypes) {
	var Item = sequelize.define("Item", {
		title: DataTypes.STRING,
		image: DataTypes.STRING,
		price: DataTypes.STRING
	});

	return Item;
};
