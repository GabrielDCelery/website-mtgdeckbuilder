var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;

var token = {

	verify: function (req, res, next){

		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		/*var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];*/
		jwt.verify(token, secretPassword, function (err, decoded){
			if(err) {
				console.log(err.message)
				res.json({
					success: false, 
					message: 'Failed to authenticate token!'
				})	

			} else {
				var username = mysql.escape(decoded.username);
				var email = mysql.escape(decoded.email);
				var password = decoded.password;
				var querystring = 'SELECT id, password FROM users WHERE username = ' + username + ' AND email = ' + email;
				connection.query(querystring, function (err, rows) {
					if (err){
						res.json({
							success: false,
							message: 'There was an error while connecting to the database!'
						});
					} else if (rows.length == 0){
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
						req.body.id = rows[0].id;
						next();
					}
				});
			}

		})

	}

}

module.exports = token;