skillsApp.factory('templateService', ['$http', function($http) {

	const save = (skills, templateName, templateId, ruleSet, callback) => {

		const postBody = { skills, templateName, templateId, ruleSet, templateId };

		$http.post("/api/v1/template/save", postBody)
			.then(
				successResponse => {
					callback(successResponse.data);
				}, 
				errorResponse => {
					console.log(errorResponse);
				});

		},

		get = (templateId, urlName, callback) => {

			$http.get(`/api/v1/template/get/${templateId}/${urlName}`)
				.then(
					successResponse => {
						callback(successResponse.data);
					},
					errorResponse => {
						console.log(errorResponse);
					}
				);
		};

	return { save, get };

}]);