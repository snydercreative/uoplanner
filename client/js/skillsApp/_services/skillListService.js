skillsApp.factory('skillListService', ['$http', function($http) {

	const getAll = (callback) => {

		$http.get("/data/skills.json")
			.then(
				successResponse => {
					callback(successResponse.data);
				}, 
				errorResponse => {
					console.log(errorResponse);
				});

	};

	return { getAll };

}]);