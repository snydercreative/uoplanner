const skillsApp = angular.module('skillsApp', ['ngTagsInput'])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}]);