console.log("app is running...");

var myApp = angular.module('myApp', [
	'ngRoute',
	'ngStorage', 
	'DisplayFactory', 
	'LoginFactory', 
	'FormValidationFactory', 
	'TokenFactory', 
	'AuthController', 
	'LoginController',
	'RegisterController',
	'ResetController',
	'ResetMailController'
	]);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider){
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

	$httpProvider.interceptors.push('TokenInterceptor');

}])

myApp.controller('MainCtrl', ['$scope', function ($scope){

}])