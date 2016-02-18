var mysql = require('mysql');

var secretPassword = 'kuhpw894';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password : null,
	database : 'mtgdeckbuilder'
});

module.exports = {
	secretPassword: secretPassword,
	connection: connection
}