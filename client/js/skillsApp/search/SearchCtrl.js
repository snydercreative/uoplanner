skillsApp.controller('SearchCtrl', ['$location', 'searchService', 'skillListService', function($location, searchService, skillListService) {

	let self = this;

	self.searchTerms = $location.search().q;
	self.skillResults = [];
	self.nameResults = [];
	
	searchService.findSkills(self.searchTerms, skillResults => {

		angular.forEach(skillResults, skillResult => {
			let tempDate = new Date(skillResult.lastModified);
			skillResult.lastModified = tempDate.toLocaleDateString() + ' @ ' + tempDate.toLocaleTimeString();
		});

		self.skillResults = skillResults;
	});

}]);