var DisplayFactory = angular.module('DisplayFactory', []);

DisplayFactory.factory('Display', [function(){

	function showSelectedElement(object, propertyName){
		for(var key in object){
			if(key == propertyName){
				object[key] = true;
			} else {
				object[key] = false;
			}
		}
	}

	return {
		showSelectedElement: showSelectedElement
	}

}])