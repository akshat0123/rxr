var pg = require('pg');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/rxr');

var User = sequelize.define("User", {
		username: Sequelize.STRING,
		password: Sequelize.STRING
});

passport.use(new passportLocal({
		username: 'username',
		password: 'password'
	},
	function (username, password, done) {
		User.find({ where: { username: username }}).then(function(user) {
			if (!user) { 
				done(null, false, {message: 'User doesn\'t exist'}); 
			} else if (user.password !== password) { 
				done(null, false, {message: 'Incorrect password'}); 
			} else {
				done(null, user);
			}
		}).catch(function(err) {
			done(err);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(function(user) {
		done(null, user);
	}).catch(function(err) {
		done(err);
	});
});

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
		password: DataTypes.STRING
  }, {
		classMethods: {
			passport: function() { return passport; }
		}
	});

  return User;
};
