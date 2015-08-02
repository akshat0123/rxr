var pg = require('pg');
var cstr = 'postgres://postgres:postgres@localhost:5432/rxr'
var client = new pg.Client(cstr);
client.connect();

function addUser(firstname, lastname, email, password, cb) {
	pg.connect(cstr, function(err, client, done) {
		if(err) { cb(err); }
		else {
			var str = 'insert into users (firstname, lastname, email, password) values ($1, $2, $3, $4);'
			client.query(str, [firstname, lastname, email, password], function (err, result) {
				done();
				client.end();
				if (err) { cb(err); }
				else {
					pg.end();
					cb(result); 
				}
			});
		}
	});
}

function login(email, password, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) { cb(err); }
		else {
			var str = 'select exists (select true from users where email = $1 and password = $2);'
			client.query(str, [email, password], function(err, result) {
				done();
				client.end();
				if (err) { cb(err) }
				else {
					pg.end();
					cb(result);
				}
			});
		}
	});
}

module.exports = {
	addUser : addUser,
	login : login
}
