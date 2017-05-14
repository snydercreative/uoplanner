skillsApp.controller('SearchCtrl', ['$location', 'searchService', function($location, searchService) {

	let self = this;

	self.searchTerms = $location.search().q;
	self.skillResults = [];
	self.nameResults = [];

	searchService.findSkills(self.searchTerms, skillResults => {
		self.skillResults = skillResults;
	});
}]);