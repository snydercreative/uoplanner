const skillsApp = angular.module('skillsApp', [])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}]);