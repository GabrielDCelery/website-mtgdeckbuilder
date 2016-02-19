var AuthFactory = angular.module('AuthFactory', []);

AuthFactory.factory('Authentication', ['$http', function($http){

	var cachedUsernames;

	function getUsers(input, callback){
		$http.post('/auth/users', input).then(function (response){
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

	function loginWithToken(token, callback){
		$http.post('/auth/token', {token: token}).then(function (response){
			callback(response);
		})
	}

	return {
		getUsers: getUsers,
		loginUser: loginUser,
		registerUser: registerUser,
		getResetMail: getResetMail,
		resetPassword: resetPassword,
		loginWithToken: loginWithToken
	}

}])