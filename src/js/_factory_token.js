var TokenFactory = angular.module('TokenFactory', []);

TokenFactory.factory('TokenInterceptor', ['$q', '$localStorage', function($q, $localStorage){

	function request(config){
		config.headers = config.headers || {};
		if($localStorage.token){
			config.headers['X-Access-Token'] = $localStorage.token;
			config.headers['X-Key'] = $localStorage.username;
			config.headers['Content-Type'] = "application/json";
		}
		return config || $q.when(config);
	}

	function response(response){
		return response || $q.when(response);
	}

	return {
		request: request,
		response: response
	}

}])