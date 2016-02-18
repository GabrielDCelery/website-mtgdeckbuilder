var ResetController = angular.module('ResetController', []);

ResetController.controller('ResetCtrl', [
	'$scope', 
	'$http', 
	'$routeParams', 
	'DisplayFact', 
	'AuthFact',
	'FormValidation', 
	function (
		$scope, 
		$http, 
		$routeParams, 
		DisplayFact,
		AuthFact,
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
			AuthFact.resetPassword(input, function (response){
				if(response.data.success){
					$scope.data.success.message = response.data.message;
					DisplayFact.showSelectedElement($scope.display.page, 'success')
				} else {
					$scope.data.error.message = response.data.message;
					DisplayFact.showSelectedElement($scope.display.page, 'error')
				}
			})
		}
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.resetPassword = resetPassword;

}])