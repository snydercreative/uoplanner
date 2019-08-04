skillsApp.controller('BuildCtrl', ['$scope', 'templateService', 'skillListService', 'naughtyService', function($scope, templateService, skillListService, naughtyService) {

	let self = this,
		changesNotSavedWarning = "Your template has unsaved changes.",
		mustSetTemplateNameAndSkillsWarning = "You must set a template name and add skills to save.",
		mustActuallySetASkillWarning = "You must select a skill and set a value greater than 0.",
		invalidOrMissingNameWarning = "You must set a valid template name",
		templateSavedWarning = "Skill template saved!",
		pickAValidSkillWarning = "Please pick an actual UO skill.",
		aboveSkillCapWarning = "This would put you over the skill cap.",
		alreadyHaveSkillWarning = "You already have that skill.",
		naughtyNameWarning = "Please pick a different name. You know why.";
		
	self.uoplannerRules = uoplanner.ruleManager.getRules();
	self.skills = [];
	self.templateName = '';
	self.urlName = '';
	self.templateId = '';
	self.skillList = [];
	self.rangeValue = 100;	
	self.skillName = '';
	self.skillTotal = 0;

	skillListService.getAll(skillList => {
		self.skillList = skillList;
	});

	self.switchRulesModalButtonClick = ruleSet => {
		self.switchRules(ruleSet);
		self.dismissModal();
	};

	self.switchRules = ruleSet => {
		uoplanner.ruleManager.setRules(ruleSet);
		self.skillTotal = 0;
		self.skills = [];
		self.templateName = '';
		self.uoplannerRules = uoplanner.ruleManager.getRules();
	};

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
		angular.element('#skills-modal').addClass('active');
	};

	self.displaySwitchRulesModal = () => {
		self.skillName = '';
		angular.element('#rule-switch-modal').addClass('active');
	};

	self.displayTemplateNameModal = () => {
		angular.element('#template-name-modal').addClass('active');
	};

	self.dismissModal = () => {
		angular.element('.modal-wrapper.active').removeClass('active');
	};

	self.editSkill = skillName => {

		const foundSkill = self.skills.filter(skill => skill.name === skillName);

		if (foundSkill) {
			self.skillName = foundSkill[0].name;
			self.rangeValue = foundSkill[0].value;
			angular.element('#skills-modal').addClass('active');
			return;
		}

		warn("Skill not found.", false);
	};

	self.removeSkill = $event => {
	
		const $target = angular.element($event.currentTarget),
			$row = $target.closest('tr'),
			skillName = $target.attr('data-skill-name'),
			skillValue = $target.attr('data-skill-value') * 1;

		self.skillTotal -= skillValue;

		for (let i = 0; i < self.skills.length; i++) {
			if (self.skills[i].name === skillName) {		
				self.skills.splice(i, 1);
				$row.detach();
				return;
			}
		}
	};

	self.addSkill = (skill) => {		
		let existingSkillIndex = -1;

		for (let i = 0; i < self.skills.length; i++) {
			if (self.skills[i].name === skill.name) {	
				self.skillTotal -= self.skills[i].value;
				existingSkillIndex = i;
				break;
			} 
		}


		if (self.skillTotal + skill.value > self.uoplannerRules.skillTotal) {
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
		
		if (self.skills[existingSkillIndex]) {	
			self.skills[existingSkillIndex].value = skill.value;
			self.skillTotal = self.skillTotal ? skill.value + self.skillTotal : skill.value;
			angular.element('.skill-modal .skill-list').slideUp(250);
			self.dismissModal();
			warn(changesNotSavedWarning);	

			return;
		} 
	
		self.skills.push(skill);
		self.skillTotal += skill.value;
		angular.element('.skill-modal .skill-list').slideUp(250);
		self.dismissModal();
		warn(changesNotSavedWarning);
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
			isNameCool(templateName, isNaughty => {
				if (isNaughty) {
					warn(naughtyNameWarning, true);
					return;
				} else {
					self.templateName = templateName;
					angular.element('#templateName').text(templateName);
					self.dismissModal();
					warn(changesNotSavedWarning);
				}	
			});		
		} else {
			warn(invalidOrMissingNameWarning, true);
		}	
	};

	self.saveTemplate = () => {
		if (self.templateName && self.skills.length) {
			templateService.save(self.skills, self.templateName, '', self.uoplannerRules.ruleSet, query => {
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

		isNameCool = (templateName, callback) => {
			naughtyService.isNaughty(templateName, isNaughty => {
				callback(isNaughty.isNaughty);
			});
		};

}]);