var AuthController = angular.module('AuthController', []);

AuthController.controller('AuthCtrl', [
	'$scope', 
	'$location', 
	'$localStorage', 
	'Login', 
	function (
		$scope, 
		$location, 
		$localStorage, 
		Login
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.auth = {
		loggedIn: false,
		username: ''
	}

/*******************************************************************************
FUNCTIONS
*******************************************************************************/	

	function loginWithToken(token){
		if(token){
			Login.loginWithToken(token, function (response){
				if(response.data.success){
					$scope.auth.loggedIn = true;
					$scope.auth.username = response.data.username;
				}
			})
		}
	}

	function logOut(){
		$scope.auth.loggedIn = false;
		$scope.auth.username = '';
		delete $localStorage.token;
		$location.path("/");
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.logOut = logOut;

/*******************************************************************************
INITITATING FUNCTIONS UPON LOADING
*******************************************************************************/

	loginWithToken($localStorage.token);

}])