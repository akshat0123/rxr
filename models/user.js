var pg = require('pg');
var cstr = 'postgres://postgres:postgres@localhost:5432/rxr'
var client = new pg.Client(cstr);
client.connect();

function addUser(username, email, password, cb) {
	pg.connect(cstr, function(error, client, done) {
		if(err) { cb(err); }
		else {
			var str = 'insert into users (username, email, password) values ($1, $2, $3);'
			client.query(str, [username, email, password], function (err, result) {
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

module.exports = {
	addUser : addUser
}
