skillsApp.controller('BuildCtrl', ['templateService', 'skillListService', 'naughtyService', function(templateService, skillListService, naughtyService) {

	let self = this,
		changesNotSavedWarning = "Your template has unsaved changes.",
		mustSetTemplateNameAndSkillsWarning = "You must set a template name and add skills to save.",
		mustActuallySetASkillWarning = "You must select a skill and set a value greater than 0.",
		invalidOrMissingNameWarning = "You must set a valid template name",
		templateSavedWarning = "Skill template saved!",
		pickAValidSkillWarning = "Please pick an actual UO skill.",
		aboveSkillCapWarning = "This would put you over the skill cap.",
		alreadyHaveSkillWarning = "You already have that skill.",
		naughtyNameWarning = "Please pick a different name. You know why.",
		skillTotal = 0,
		skillCap = 700;
	
	self.skills = [];
	self.templateName = '';
	self.urlName = '';
	self.templateId = '';
	self.skillList = [];

	skillListService.getAll(skillList => {
		self.skillList = skillList;
	});

	const clipboard = new Clipboard('#sharing button');

	angular.element('#sharing button').on('click', (event) => {
		const $target = angular.element(event.currentTarget);

		$target.text("Copied!").animate({
			top: "-50px",
			opacity: 0
		}, 250, () => {
			$target.text("Copy").animate({
				top: 0,
				opacity: 1
			}, 250);
		});
	});

	/***************** */

	self.setSkillInput = selectedItem => {
		self.skillName = selectedItem.skill;
		angular.element('.skill-modal .skill-list').slideUp(250);
	};

	self.displaySkillList = () => {
		angular.element('.skill-modal .skill-list').slideDown(250);
	};

	self.displayAddSkillModal = () => {
		self.skillName = '';
		angular.element('.skill-modal').closest('.modal-wrapper').addClass('active');
	};

	self.displayTemplateNameModal = () => {
		angular.element('.name-modal').closest('.modal-wrapper').addClass('active');
	};

	self.dismissModal = () => {
		angular.element('.modal-wrapper.active').removeClass('active');
	};


	self.removeSkill = $event => {
	
		const $target = angular.element($event.currentTarget),
			$row = $target.closest('tr'),
			skillName = $target.attr('data-skill-name'),
			skillValue = $target.attr('data-skill-value') * 1;

		skillTotal -= skillValue;

		for (let i = 0; i < self.skills.length; i++) {
			if (self.skills[i].name === skillName) {		
				self.skills.splice(i, 1);
				$row.detach();
				return;
			}
		}
	};

	self.addSkill = (skill) => {

		if (skillTotal + skill.value > skillCap) {
			warn(aboveSkillCapWarning, true);
			return;
		}

		if (!skill.name || skill.value === 0) {
			warn(mustActuallySetASkillWarning, true);
			return;
		}

		if (self.skillList.indexOf(skill.name) === -1) {
			warn(pickAValidSkillWarning, true);
			return;
		}
		
		for (let i = 0; i < self.skills.length; i++) {
			if (self.skills[i].name === skill.name) {
				warn(alreadyHaveSkillWarning, true);
				return;
			}
		}
	
		self.skills.push(skill);
		skillTotal += skill.value;
		angular.element('.skill-modal .skill-list').slideUp(250);
		self.dismissModal();
		warn(changesNotSavedWarning);
	};

	self.setTemplateName = (templateName) => {
		if (isNameCool(templateName)) {
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
		} else {
			warn(naughtyNameWarning, true);
		}
	};

	self.saveTemplate = () => {
		if (self.templateName && self.skills.length) {
			templateService.save(self.skills, self.templateName, '', query => {
				self.templateId = query.templateId;
				self.urlName = query.urlName;
				warn(templateSavedWarning);
				updateSharingLink(self.templateId, self.urlName);
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
				}, 1500);
			});
		},

		updateSharingLink = (templateId, urlName) => {
			const url = window.location.origin + `/share/${templateId}/${urlName}`;
			angular.element('#sharing .link').removeClass('inactive').text(url);
			angular.element('#sharing button').show();
		},

		isNameCool = templateName => {
			return naughtyService.isNaughty(templateName);
		};

}]);