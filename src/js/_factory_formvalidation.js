var FormValidationFactory = angular.module('FormValidationFactory', []);

FormValidationFactory.factory('FormValidation', [function(){

	function isEmailValid(input){

		var pattern = new RegExp(/^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/);

		if(!pattern.test(input)){
			return true;
		} else {
			return false;
		}
	}

	function isInputLongEnough(input, length){
		if(input.length < length){
			return true;
		} else {
			return false;
		}
	}

	function areInputsMatching(inputOne, inputTwo){
		if(inputOne != inputTwo){
			return true;
		} else {
			return false;
		}
	}

	function canSendData(alertObject){

		var canSend = true;

		for(var property in alertObject){
			if(alertObject[property] == true) canSend = false;
		}

		if(canSend) return true;

	}

	return {
		isEmailValid: isEmailValid,
		isInputLongEnough: isInputLongEnough,
		areInputsMatching: areInputsMatching,
		canSendData: canSendData
	}

}])