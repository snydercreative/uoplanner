skillsApp.factory('searchService', ['$http', 'skillListService', function($http, skillListService) {

	const findSkills = (searchTerms, callback) => {
			$http.get('/api/v1/search/skills?q=' + searchTerms)
				.then(
					successResponse => {
						callback(successResponse.data);
					},
					errorResponse => {
						console.log(errorResponse);
					}
				);
		},
		
		findNames = (searchTerms, callback) => {
			$http.get('/api/v1/search/names?q=' + searchTerms)
				.then(
					successResponse => {
						callback(successResponse.data);
					},
					errorResponse => {
						console.log(errorResponse);
					}
				);
		};

	return { findSkills, findNames };
}]);