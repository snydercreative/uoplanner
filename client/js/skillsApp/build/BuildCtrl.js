skillsApp.controller('BuildCtrl', ['templateService', 'skillListService', function(templateService, skillListService) {

	let self = this,
		changesNotSavedWarning = "Your template has unsaved changes.",
		mustSetTemplateNameAndSkillsWarning = "You must set a template name and add skills to save.",
		mustActuallySetASkillWarning = "You must select a skill and set a value greater than 0.",
		invalidOrMissingNameWarning = "You must set a valid template name",
		templateSavedWarning = "Template saved!";
	
	self.skills = [];
	self.templateName = '';
	self.templateId = '';
	self.skillList = [];

	skillListService.getAll(skillList => {
		self.skillList = skillList;
	});

	self.setSkillInput = selectedItem => {
		self.skillName = selectedItem.skill;
		angular.element('.skill-modal .skill-list').slideUp(250);
	};

	self.displaySkillList = () => {
		angular.element('.skill-modal .skill-list').slideDown(250);
	};

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
		if (skill.name && skill.value > 0) {
			self.skills.push(skill);
			angular.element('.skill-modal .skill-list').slideUp(250);
			self.dismissModal();
			warn(changesNotSavedWarning);
		} else {
			warn(mustActuallySetASkillWarning, true);
		}
	};

	self.setTemplateName = (templateName) => {
		let urlName = templateName
			.toLowerCase()
			.trim()
			.replace(/\s/g, "_")
			.replace(/\W/g, "")
			.replace(/_/g, "-")
			.replace(/--/g, "-");

		if (urlName) {
			self.templateName = templateName;
			angular.element('#templateName').text(templateName);
			self.dismissModal();
			warn(changesNotSavedWarning);
		} else {
			warn(invalidOrMissingNameWarning, true);
		}		
	};

	self.saveTemplate = () => {
		if (self.templateName && self.skills.length) {
			templateService.save(self.skills, self.templateName, '', templateId => {
				self.templateId = templateId;
				console.log(templateId);
			});
		} else {
			warn(mustSetTemplateNameAndSkillsWarning, false);
		}
	};

	const warn = (message, isModal) => {
			const warningTargetSelector = isModal ? '.panel > .modal-warning' : 'body > .warning';

			let $warning = angular.element(warningTargetSelector);
			$warning.find('p').text(message);
			$warning.slideDown(250, () => {
				setTimeout(() => {
					$warning.slideUp(250);
				}, 3000);
			});
		};

}]);