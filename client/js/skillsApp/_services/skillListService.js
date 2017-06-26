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

		},

		getForAutocomplete = (callback) => {
			getAll((skills) => {
				let skillsForAutocomplete = [];

				angular.foreach(skills, value => {
					skillsForAutocomplete.push({ text: value });
				});

				callback(skillsForAutocomplete);
			});
		};

	return { getAll, getForAutocomplete };

}]);