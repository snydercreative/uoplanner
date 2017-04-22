skillsApp.factory('templateService', ['$http', function($http) {

	const save = (skills, templateName, templateId, callback) => {

		const postBody = { skills, templateName, templateId };

		$http.post("http://localhost:1234/api/v1/template/save", postBody)
			.then(
				successResponse => {
					callback(successResponse.data);
				}, 
				errorResponse => {
					console.log(errorResponse);
				});

	};

	return { save };

}]);