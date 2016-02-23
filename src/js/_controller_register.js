var RegisterController = angular.module('RegisterController', []);

RegisterController.controller('RegisterCtrl', [
	'$scope', 
	'$http', 
	'Display', 
	'Login', 
	'FormValidation', 
	function (
		$scope, 
		$http, 
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
			emailvalid: false,
			usernamelength: false,
			passwordlength: false,
			passwordsmatching: false
		}
	}

	$scope.data = {
		form: {
			email: '',
			username: '',
			password: '',
			passwordconfirm: ''
		},
		success: {
			message:''
		},
		error: {
			message: ''
		}
	}

/*******************************************************************************
FUNCTIONS - FORM - VALIDATION
*******************************************************************************/

	function doesUserAlreadyExist(input, callback){
		Login.doesUserExist(input, function (response){

			if(response.data.success){
				$scope.display.page.error = false;
				callback();
			} else {
				$scope.display.page.error = true;
				$scope.data.error.message = response.data.message;
			}

		})

	}

/*******************************************************************************
FUNCTIONS - FORM - DATABASE
*******************************************************************************/

	function registerUser(input){

		$scope.display.alert.emailvalid = FormValidation.isEmailValid($scope.data.form.email);
		$scope.display.alert.usernamelength = FormValidation.isInputLongEnough($scope.data.form.username, 5);
		$scope.display.alert.passwordlength = FormValidation.isInputLongEnough($scope.data.form.password, 8);
		$scope.display.alert.passwordsmatching = FormValidation.areInputsMatching($scope.data.form.password, $scope.data.form.passwordconfirm);

		doesUserAlreadyExist(input, function(){
			if(FormValidation.canSendData($scope.display.alert)){
				Login.registerUser(input, function (response){
					if(response.data.success){
						$scope.data.success.message = response.data.message;
						Display.showSelectedElement($scope.display.page, 'success');
					} else {
						$scope.data.error.message = response.data.message;
						$scope.display.page.error = true;
					}
				})
			}			
		});

	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

	$scope.registerUser = registerUser;

}])