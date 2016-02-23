console.log("app is running...");

var myApp = angular.module('myApp', [
	'ngRoute',
	'ngStorage', 
	'DisplayFactory', 
	'UsersFactory', 
	'FormValidationFactory', 
	'AuthController', 
	'LoginController',
	'RegisterController',
	'ResetController',
	'ResetMailController'
	]);

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/_main.html',
			controller: 'MainCtrl'
		})
		.when('/login', {
			templateUrl: 'views/auth/_login.html',
			controller: 'LoginCtrl'
		})
		.when('/register', {
			templateUrl: 'views/auth/_register.html',
			controller: 'RegisterCtrl'
		})
		.when('/reset', {
			templateUrl: 'views/auth/_resetmail.html',
			controller: 'ResetMailCtrl'
		})
		.when('/reset/:encrypteduserdata', {
			templateUrl: 'views/auth/_reset.html',
			controller: 'ResetCtrl'	
		})
		.otherwise({
			redirectTo: '/'
		})

	$locationProvider.html5Mode(true);

}])

myApp.controller('MainCtrl', ['$scope', function ($scope){

}])