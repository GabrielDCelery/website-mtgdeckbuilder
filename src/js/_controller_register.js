var RegisterController = angular.module('RegisterController', []);

RegisterController.controller('RegisterCtrl', [
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
FUNCTIONS - FORM - REGISTER - VALIDATION
*******************************************************************************/

	function isEmailValid(){

		var pattern = new RegExp(/^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/);

		if(!pattern.test($scope.data.form.email)){
			$scope.display.alert.emailvalid = true;
		} else {
			$scope.display.alert.emailvalid = false;
		}

	}

	function checkUsernameLength(){
		if($scope.data.form.username < 5){
			$scope.display.alert.usernametooshort = true;
		} else {
			$scope.display.alert.usernametooshort = false;
		}
	}

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

	function checkPasswordLength(){
		if($scope.data.form.password.length < 8){
			$scope.display.alert.passwordlength = true;
		} else {
			$scope.display.alert.passwordlength = false;
		}
	}

	function checkPasswordsMatching(){
		if($scope.data.form.password != $scope.data.form.passwordconfirm){
			$scope.display.alert.passwordsmatching = true;
		} else {
			$scope.display.alert.passwordsmatching = false;
		}
	}

	function canSendRegistration(){
		if(
			$scope.display.alert.emailvalid == false &&
			$scope.display.alert.emailtaken == false &&
			$scope.display.alert.usernametaken == false &&
			$scope.display.alert.usernametooshort == false &&
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

	function registerUser(input){

		checkUsernameLength();
		isEmailValid();
		checkPasswordLength();
		checkPasswordsMatching();
		doesUserAlreadyExist(input, function(){
			if(canSendRegistration()){
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