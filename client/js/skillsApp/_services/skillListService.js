skillsApp.factory('skillListService', ['$http', function($http) {

	const getAll = (callback) => {

		$http.get("/data/skills.json")
			.then(
				successResponse => {
					callback(successResponse.data.skills);
				}, 
				errorResponse => {
					console.log(errorResponse);
				});
		};

	return { getAll };

}]);