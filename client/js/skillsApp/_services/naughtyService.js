skillsApp.factory('naughtyService', ['$http', function($http) {

	const isNaughty = (templateName, callback) => {

		$http.get("/api/v1/template/naughty/" + templateName)
			.then(
				successResponse => {
					callback(successResponse.data);
				}, 
				errorResponse => {
					console.log(errorResponse);
				});
		};

	return { isNaughty };

}]);