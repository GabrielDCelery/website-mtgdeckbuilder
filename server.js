var express = require('express');
var bodyParser = require('body-parser');

var globalRequire = require('./global_require.js'); // globally require modules (works everywhere)

var routes = require('./routes');
var token = require('./middlewares/token');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(require('connect-livereload')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	res.header("Access-Control-Allow-Credentials", true);
	next();
})

app.all('/test', token.verify);

app.use('/', routes);

app.get('*', function (req, res){
	res.sendFile(__dirname + '/public/app.html');
})

app.listen(3000, function(){
	console.log('server is running at port 3000....');
})