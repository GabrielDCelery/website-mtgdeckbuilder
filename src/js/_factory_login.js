var LoginFactory = angular.module('LoginFactory', []);

LoginFactory.factory('Login', ['$http', function($http){

	var cachedUsernames;

	function doesUserExist(input, callback){
		$http.post('/auth/doesuserexist', input).then(function (response){
			callback(response);
		})
	}

	function loginUser(input, callback){
		$http.post('/auth/login', input).then(function (response){
			callback(response);
		});
	}

	function registerUser(input, callback){
		$http.post('/auth/register', input).then(function (response){
			callback(response);
		});	
	}

	function getResetMail(input, callback){
		$http.post('/auth/resetmail', input).then(function (response){
			callback(response);
		});
	}

	function resetPassword(input, callback){
		$http.post('/auth/reset', input).then(function (response){
			callback(response);
		})
	}

	return {
		doesUserExist: doesUserExist,
		loginUser: loginUser,
		registerUser: registerUser,
		getResetMail: getResetMail,
		resetPassword: resetPassword
	}

}])