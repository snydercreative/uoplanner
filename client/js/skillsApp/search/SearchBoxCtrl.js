skillsApp.controller('SearchBoxCtrl', ['skillListService', function(skillListService) {

	let self = this;

	self.skillsForAutocomplete = [];

	skillListService.getForAutocomplete(skillsForAutocomplete => {
		self.skillsForAutocomplete = skillsForAutocomplete;
	});
}]);

