skillsApp.controller('BuildCtrl', function() {

	let self = this;

	self.skills = [
		{ name: 'Macing', value: 100 },
		{ name: 'Tactics', value: 100 },
		{ name: 'Anatomy', value: 100 }
	];

	self.displayAddSkillModal = () => {
		angular.element('.skill-modal').closest('.modal-wrapper').addClass('active');
	};

	self.dismissModal = ($event) => {
		angular.element('.modal-wrapper.active').removeClass('active');
	};

	self.addSkill = (skill) => {
		self.skills.push(skill);
		angular.element('.modal-wrapper.active').removeClass('active');
	};

	const editableClickHandler = (event) => {
		const $target = angular.element(event.currentTarget);			
	};

	document.querySelector('h1').addEventListener('click', editableClickHandler);

});