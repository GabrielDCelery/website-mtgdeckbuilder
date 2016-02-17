var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password : null,
	database : 'mtgdeckbuilder'
});

var authRoute = express.Router();

authRoute.post('/users', function (req, res){

	var username = mysql.escape(req.body.username);
	var email = mysql.escape(req.body.email);
	var querystring = 'SELECT username, email FROM users WHERE username = ' + username + ' OR email = ' + email;

	connection.query(querystring, function(err, rows){
		if (err) throw err;
		res.json(rows);
	})

})

authRoute.post('/login', function (req, res){

	var username = mysql.escape(req.body.username);
	var password = md5(req.body.password);
	var rememberme = req.body.rememberme;
	var querystring = 'SELECT * FROM users WHERE username = ' + username;

	connection.query(querystring, function(err, rows) {
		if (err) throw err;
		if (rows.length == 0){
			res.json({
				success: false, 
				message: 'User not found!'
			});
		} else if (rows[0].password != password){
			res.json({
				success: false,
				message: 'Wrong password!'
			});
		} else {
			res.json({
				success: true,
				message: 'Login successful!'
			});
		}

	});

})

authRoute.post('/register', function (req, res){

	var username = mysql.escape(req.body.username);
	var password = mysql.escape(md5(req.body.password));
	var email = mysql.escape(req.body.email);
	
	var querystring = 'INSERT INTO users (username, password, email) VALUES (' + username + ', ' + password + ', ' + email + ')';
	
	connection.query(querystring, function(err, result) {
		if (err) throw err;
		if(result.affectedRows == 1){
			res.json({
				success: true,
				message: 'User addedd successfully!'
			});
		} else {
			res.json({
				success: false,
				message: 'Could not add new user!'
			});
		}
	});
	
})

module.exports = authRoute;