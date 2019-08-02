skillsApp.controller('ShareCtrl', ['templateService', '$location', '$scope', function(templateService, $location, $scope) {

	let self = this;

	self.templateId = encodeURIComponent(window.location.pathname.split('/')[2]);
	self.urlName = encodeURIComponent(window.location.pathname.split('/')[3]);
	self.shareUrl = window.location.origin + `/share/${self.templateId}/${self.urlName}`;

	templateService.get(self.templateId, self.urlName, results => {
		self.skills = results.skills;
		self.templateName = results.name;
		self.ruleSet = results.ruleSet;
	});

	angular.element('#sharing button').on('click', (event) => {
		const $target = angular.element(event.currentTarget);

		$target.text("Copied!").animate({
			top: "-20px",
			opacity: 0
		}, 250, () => {
			setTimeout(() => {
				$target.text("Copy").animate({
					top: 0,
					opacity: 1
				}, 250);
			}, 500);
		});
	});

}]);