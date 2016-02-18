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
			success: false,
			error: false
		}
	}

	$scope.data = {
		form: {
			username: '',
			password: '',
			rememberme: false
		},
		success: {
			message: ''
		},
		error: {
			message: ''
		}
	}

/*******************************************************************************
FUNCTIONS - FORM - DATABASE
*******************************************************************************/

	function loginUser(input){
		AuthFact.loginUser(input, function (response){

			if(response.data.success){
				$scope.data.success.message = response.data.message;
				DisplayFact.showSelectedElement($scope.display.page, 'success');
			} else {
				$scope.data.error.message = response.data.message;
				$scope.display.page.error = true;
			}

		})
	}


/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.loginUser = loginUser;

}])