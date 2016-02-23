var LoginController = angular.module('LoginController', []);

LoginController.controller('LoginCtrl', [
	'$scope', 
	'$http', 
	'$localStorage', 
	'Display', 
	'Login',
	'FormValidation', 
	function (
		$scope, 
		$http, 
		$localStorage, 
		Display,
		Login,
		FormValidation
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.display = {
		page: {
			form: true,
			success: false,
			error: false
		}, 
		alert: {
			usernamelength: false,
			passwordlength: false,
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

		$scope.display.alert.usernamelength = FormValidation.isInputLongEnough($scope.data.form.username, 5);
		$scope.display.alert.passwordlength = FormValidation.isInputLongEnough($scope.data.form.password, 8);

		if(FormValidation.canSendData($scope.display.alert)){
			Login.loginUser(input, function (response){

				$scope.auth.username = $scope.data.form.username;
				
				$localStorage.token = response.data.token;
				$localStorage.username = $scope.data.form.username;
	
				if(response.data.success){
					$scope.data.success.message = response.data.message;
					$scope.auth.loggedIn = true;
					Display.showSelectedElement($scope.display.page, 'success');
				} else {
					$scope.data.error.message = response.data.message;
					$scope.display.page.error = true;
				}

			})
		}

	}


/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.loginUser = loginUser;

}])