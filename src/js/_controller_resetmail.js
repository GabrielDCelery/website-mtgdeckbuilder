var ResetMailController = angular.module('ResetMailController', []);

ResetMailController.controller('ResetMailCtrl', [
	'$scope', 
	'$http', 
	'$routeParams', 
	'Display', 
	'Login',
	'FormValidation', 
	function (
		$scope, 
		$http, 
		$routeParams, 
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
			emailvalid: false
		}
	}

	$scope.data = {
		form: {
			email: ''
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

	function getResetMail(input){

		$scope.display.alert.emailvalid = FormValidation.isEmailValid($scope.data.form.email);

		if(FormValidation.canSendData($scope.display.alert)){
			Login.getResetMail(input, function (response){
				if(response.data.success){
					$scope.data.success.message = response.data.message;
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

	$scope.getResetMail = getResetMail;

}])