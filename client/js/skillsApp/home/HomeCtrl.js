skillsApp.controller('HomeCtrl', ['$http', function($http) {

	let self = this;

	self.recentData = [];
	self.uoplannerRules = uoplanner.ruleManager.getRules();

	self.switchRules = function switchRules(ruleSet) {
		uoplanner.ruleManager.setRules(ruleSet);

		self.uoplannerRules = uoplanner.ruleManager.getRules();
	}

	$http.get('/api/v1/template/recent')
		.then(
			successResponse => {
				self.recentData = process(successResponse.data);
			},
			errorResponse => {
				console.log(errorResponse);
			}
		);

	const process = dataArr => {
		for (let i = 0; i < dataArr.length; i++) {
			let tempDate = new Date(dataArr[i].lastModified);
			dataArr[i].lastModified = tempDate.toLocaleDateString() + ' @ ' + tempDate.toLocaleTimeString();
			dataArr[i].url = `/share/${dataArr[i].templateId}/${dataArr[i].urlName}`;
		}

		return dataArr;
	};

}]);