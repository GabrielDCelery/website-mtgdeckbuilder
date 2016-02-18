var ResetController = angular.module('ResetController', []);

ResetController.controller('ResetCtrl', [
	'$scope', 
	'$http', 
	'$routeParams', 
	'DisplayFact', 
	'AuthFact',
	function (
		$scope, 
		$http, 
		$routeParams, 
		DisplayFact,
		AuthFact
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.display = {
		page: {
			resetmail: {
				form: true,
				success: false,
				error: false
			},
			reset: {
				form: true,
				success: false,
				error: false
			}
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
			resetmail: {
				email: ''
			},
			reset: {
				newpassword: '',
				confirmnewpassword: ''
			}
		},
		success: {
			message: ''
		},
		error: {
			message: ''
		}
	}

/*******************************************************************************
FUNCTIONS - FORM - VALIDATION
*******************************************************************************/

	function checkPasswordLength(){
		if($scope.data.form.reset.newpassword.length < 8){
			$scope.display.alert.passwordlength = true;
		} else {
			$scope.display.alert.passwordlength = false;
		}
	}

	function checkPasswordsMatching(){
		if($scope.data.form.reset.newpassword != $scope.data.form.reset.confirmnewpassword){
			$scope.display.alert.passwordsmatching = true;
		} else {
			$scope.display.alert.passwordsmatching = false;
		}
	}

	function canSendRegistration(){
		if(
			$scope.display.alert.passwordlength == false &&
			$scope.display.alert.passwordsmatching == false
		){
			return true;
		} else {
			return false;
		}
	}

/*******************************************************************************
FUNCTIONS - FORM - DATABASE
*******************************************************************************/

	function getResetMail(input){
		AuthFact.getResetMail(input, function (response){
			if(response.data.success){
				$scope.data.success.message = response.data.message;
				DisplayFact.showSelectedElement($scope.display.page.resetmail, 'success');
			} else {
				$scope.data.error.message = response.data.message;
				$scope.display.page.resetmail.error = true;
			}

		})
	}

	function resetPassword(input){
		input.encrypteduserdata = $routeParams.encrypteduserdata;
		checkPasswordLength();
		checkPasswordsMatching();
		if(canSendRegistration()){
			AuthFact.resetPassword(input, function (response){
				if(response.data.success){
					$scope.data.success.message = response.data.message;
					DisplayFact.showSelectedElement($scope.display.page.reset, 'success')
				} else {
					$scope.data.error.message = response.data.message;
					DisplayFact.showSelectedElement($scope.display.page.reset, 'error')
				}
			})
		}
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.getResetMail = getResetMail;
	$scope.resetPassword = resetPassword;

}])