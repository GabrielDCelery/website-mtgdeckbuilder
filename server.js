var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var authRoute = require('./routes/auth');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(require('connect-livereload')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoute);

app.get('*', function (req, res){
	res.sendFile(__dirname + '/public/app.html');
})

app.listen(3000, function(){
	console.log('server is running at port 3000....');
})