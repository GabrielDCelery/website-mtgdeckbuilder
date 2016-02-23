var AuthController = angular.module('AuthController', []);

AuthController.controller('AuthCtrl', [
	'$scope', 
	'$http', 
	'$location', 
	'$localStorage', 
	'Login', 
	function (
		$scope, 
		$http, 
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

	function logIn(){
		if($localStorage.token){
			$scope.auth.loggedIn = true;
			$scope.auth.username = $localStorage.username;
		}
	}

	function logOut(){
		$scope.auth.loggedIn = false;
		$scope.auth.username = '';
		delete $localStorage.token;
		delete $localStorage.username;
		$location.path("/");
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.logOut = logOut;

/*******************************************************************************
INITITATING FUNCTIONS UPON LOADING
*******************************************************************************/

	logIn();

}])