var pg = require('pg');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/rxr');

var User = sequelize.define('user', {
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

User.sync();

function createUser(username, password, done) {
	User.find({ where: { username: username }}).then(function(user) {
		if (user) { 
			done(false, user, { message: 'User already exists' });
		} else { 
			var newUser = User.create({username: username, password: password});
			done(true, newUser, { message: 'User created' });
		}
	});
}

module.exports = {
	passport: passport,
	createUser: createUser
}
