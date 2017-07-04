skillsApp.controller('SearchBoxCtrl', ['skillListService', function(skillListService) {

	let self = this;

	self.skillTags = [];

	skillListService.getAll(skills => {
		self.skills = skills;
	});

	self.displaySkillList = () => {
		angular.element('.skill-modal .skill-list').slideDown(250);
	};

	self.addSkillTag = selectedItem => {
		if (self.skillTags.indexOf(selectedItem.skill) === -1)
			self.skillTags.push(selectedItem.skill);

		self.skillName = '';
		angular.element('.skill-modal .skill-list').slideUp(250);
	};

	self.search = () => {
		if (self.skillTags.length) {
			const searchTerms = self.skillTags.join(',');
			window.location = '/search?q=' + searchTerms;
		}
	};

}]);

