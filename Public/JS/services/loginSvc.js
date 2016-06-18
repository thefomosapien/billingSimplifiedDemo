angular.module("app").service("loginSvc", function ($http, $state) {

	this.login = function(data) {
		return $http({
			method: 'POST',
			url: "/login",
			data: {
				email: data.email,
				password: data.password
			}
		}).then(function(response) {
			$state.go(response.data.userType);
			// console.log(response.data.userType);
			return response;
		});
	};
	this.getCurrentUser = function() {
		return $http({
			method: 'GET',
			url: '/current/user'
		}).then(function(response) {
			return response;
		});
	};

});
