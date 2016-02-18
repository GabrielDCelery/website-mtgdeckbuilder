var ResetController = angular.module('ResetController', []);

ResetController.controller('ResetCtrl', [
	'$scope', 
	'$http', 
	'$routeParams', 
	'Display', 
	'Authentication',
	'FormValidation', 
	function (
		$scope, 
		$http, 
		$routeParams, 
		Display,
		Authentication,
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
			usernamedoesntexist: false,
			passwordwrong: false,
			passwordlength: false,
			passwordsmatching: false
		}
	}

	$scope.data = {
		form: {
			newpassword: '',
			confirmnewpassword: ''
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

	function resetPassword(input){
		input.encrypteduserdata = $routeParams.encrypteduserdata;

		$scope.display.alert.passwordlength = FormValidation.isInputLongEnough($scope.data.form.newpassword, 8);
		$scope.display.alert.passwordsmatching = FormValidation.areInputsMatching($scope.data.form.newpassword, $scope.data.form.confirmnewpassword);

		if(FormValidation.canSendData($scope.display.alert)){
			Authentication.resetPassword(input, function (response){
				if(response.data.success){
					$scope.data.success.message = response.data.message;
					Display.showSelectedElement($scope.display.page, 'success')
				} else {
					$scope.data.error.message = response.data.message;
					Display.showSelectedElement($scope.display.page, 'error')
				}
			})
		}
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.resetPassword = resetPassword;

}])