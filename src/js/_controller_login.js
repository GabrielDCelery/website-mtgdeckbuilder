var LoginController = angular.module('LoginController', []);

LoginController.controller('LoginCtrl', [
	'$scope', 
	'$http', 
	'DisplayFact', 
	'AuthFact',
	function (
		$scope, 
		$http, 
		DisplayFact,
		AuthFact
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.display = {
		page: {
			form: true,
			success: false
		},
		alert: {
			usernamedoesntexist: false,
			passwordwrong: false
		}
	}

	$scope.data = {
		form: {
			username: '',
			password: '',
			rememberme: false
		}
	}

/*******************************************************************************
FUNCTIONS - FORM - DATABASE
*******************************************************************************/

	function loginUser(input){
		AuthFact.loginUser(input, function (response){

			$scope.display.alert.usernamedoesntexist = false;
			$scope.display.alert.passwordwrong = false;

			if(!response.data.success){

				if(response.data.message == 'User not found!'){
					$scope.display.alert.usernamedoesntexist = true;
				}
				if(response.data.message == 'Wrong password!'){
					$scope.display.alert.passwordwrong = true;
				}

			} 

			if(response.data.success){
				$scope.display.page.form = false;
				$scope.display.page.success = true;
			}

		})
	}


/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.loginUser = loginUser;

}])