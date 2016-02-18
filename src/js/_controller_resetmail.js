var ResetMailController = angular.module('ResetMailController', []);

ResetMailController.controller('ResetMailCtrl', [
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
		AuthFact.getResetMail(input, function (response){
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

	$scope.getResetMail = getResetMail;

}])