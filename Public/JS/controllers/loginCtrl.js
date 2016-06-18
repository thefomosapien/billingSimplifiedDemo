angular.module("app")
	.controller('loginCtrl', function($scope, loginSvc) {

		$scope.login = function(credentials) {
			loginSvc.login(credentials);
		};

});
