skillsApp.controller('BuildCtrl', ['$scope', '$location', 'templateService', 'skillListService', 'naughtyService', function($scope, $location, templateService, skillListService, naughtyService) {

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
	self.suggestedSkills = [];
	self.templateName = '';
	self.skillList = [];
	self.rangeValue = 100;	
	self.skillName = '';
	self.skillTotal = 0;

	const urlTemplateId = window.location.pathname.split('/')[2];
	const urlTemplateUrlName = window.location.pathname.split('/')[3];

	if (typeof urlTemplateId !== 'undefined' && typeof urlTemplateUrlName !== 'undefined') {
		self.templateId = encodeURIComponent(urlTemplateId);
		self.urlName = encodeURIComponent(urlTemplateUrlName);
	}

	if (self.templateId && self.urlName) {
		templateService.get(self.templateId, self.urlName, results => {
			self.skills = uoplanner.skillSorter.sort(results.map(item => item.skill));
			self.ruleSet = results.ruleSet;
			self.skillTotal = self.skills.reduce((acc, curr) => acc + curr.value, 0);
		});
	}

	skillListService.getAll(fullSkillsList => {
		self.skillList = fullSkillsList.map((item) => item.skill);
		self.relatedSkillList = fullSkillsList;
	});

	self.changeView = function(view){
		$location.path(view); // path not hash
	}

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
		angular.element('#skillSearch').focus()
	};

	self.displayAddSkillModal = () => {
		self.skillName = '';
		angular.element('#skills-modal').addClass('active');
	};

	self.displayRelatedSkillsModal = () => {
		angular.element('#related-skills-modal').addClass('active');
		angular.element('.skill-modal .skill-list').slideDown(250);
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
			self.skills = uoplanner.skillSorter.sort(self.skills);
			warn(changesNotSavedWarning);	

			return;
		} 
	
		self.skills.push(skill);
		self.skillTotal += skill.value;
		self.skills = uoplanner.skillSorter.sort(self.skills);
		angular.element('.skill-modal .skill-list').slideUp(250);
		self.dismissModal();
		warn(changesNotSavedWarning);

		self.suggestedSkills = self.findRelatedSkills(skill.name)

		self.suggestedSkills = self.suggestedSkills.filter(suggestedSkill => {
			const dupes = self.skills.filter(skill => skill.name === suggestedSkill)

			return dupes.length === 0
		})

		if (self.suggestedSkills.length) {
			self.displayRelatedSkillsModal()
		}
	};

	self.addRelatedSkills = (skillNames) => {
		const relatedSkills = skillNames.map(skill => ({ name: skill, value: self.rangeValue }))
		const relatedSkillValues = relatedSkills.map(skill => skill.value)
		const relatedSkillsTotal = relatedSkillValues.reduce((acc, curr) => acc + curr);

		if (self.skillTotal + relatedSkillsTotal > self.uoplannerRules.skillTotal) {
			warn(aboveSkillCapWarning, true);
			return;
		}

		if (self.rangeValue === 0) {
			warn(mustActuallySetASkillWarning, true);
			return;
		}
	
		self.skills.push(...relatedSkills);

		self.skillTotal += relatedSkillsTotal;
		self.skills = uoplanner.skillSorter.sort(self.skills);
		angular.element('.skill-modal .skill-list').slideUp(250);
		self.dismissModal();
		warn(changesNotSavedWarning);
	};

	self.findRelatedSkills = (skillName) => {
		const relatedSkills = self.relatedSkillList.filter(item => item.skill.toLowerCase() === skillName.toLowerCase())

		if (relatedSkills.length && relatedSkills[0].hasOwnProperty('related')) {
			return relatedSkills[0].related
		}

		return []
	}

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
			templateService.save(self.skills, self.templateName, self.templateId, self.uoplannerRules.ruleSet, query => {
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