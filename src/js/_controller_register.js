var RegisterController = angular.module('RegisterController', []);

RegisterController.controller('RegisterCtrl', [
	'$scope', 
	'$http', 
	'DisplayFact', 
	'AuthFact', 
	'FormValidation', 
	function (
		$scope, 
		$http, 
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
			emailvalid: false,
			emailtaken: false,
			usernametaken: false,
			usernametooshort: false,
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
		AuthFact.getUsers(input, function (response){
			$scope.display.alert.usernametaken = false;
			$scope.display.alert.emailtaken = false;
			for(var i = 0; i < response.data.length; i++){
				if(response.data[i].username == $scope.data.form.username){
					$scope.display.alert.usernametaken = true;
				}
				if(response.data[i].email == $scope.data.form.email){
					$scope.display.alert.emailtaken = true;
				}
			}
			callback();
		})

	}

/*******************************************************************************
FUNCTIONS - FORM - DATABASE
*******************************************************************************/

	function registerUser(input){

		$scope.display.alert.emailvalid = FormValidation.isEmailValid($scope.data.form.email);
		$scope.display.alert.usernametooshort = FormValidation.isInputLongEnough($scope.data.form.username, 5);
		$scope.display.alert.passwordlength = FormValidation.isInputLongEnough($scope.data.form.password, 8);
		$scope.display.alert.passwordsmatching = FormValidation.areInputsMatching($scope.data.form.password, $scope.data.form.passwordconfirm);

		doesUserAlreadyExist(input, function(){
			if(FormValidation.canSendData($scope.display.alert)){
				AuthFact.registerUser(input, function (response){
					if(response.data.success){
						$scope.data.success.message = response.data.message;
						DisplayFact.showSelectedElement($scope.display.page, 'success');
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