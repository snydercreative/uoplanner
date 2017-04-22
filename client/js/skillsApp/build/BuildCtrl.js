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

	self.displayTemplateNameModal = () => {
		angular.element('.name-modal').closest('.modal-wrapper').addClass('active');
	};

	self.dismissModal = () => {
		angular.element('.modal-wrapper.active').removeClass('active');
	};

	self.addSkill = (skill) => {
		self.skills.push(skill);
		self.dismissModal();
		angular.element('.warning').slideDown(250);
	};

	self.setTemplateName = (templateName) => {
		angular.element('#templateName').text(templateName);
		self.dismissModal();
		angular.element('.warning').slideDown(250);
	};

	self.saveTemplate = () => {
		angular.element('.warning').slideUp(250);
	};

	const editableClickHandler = (event) => {
		const $target = angular.element(event.currentTarget);			
	};

	document.querySelector('h1').addEventListener('click', editableClickHandler);

});