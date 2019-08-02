skillsApp.directive('rulesetSwitcher', () => {
    const ruleSwitcherController = ['$scope', function ruleSwitcherController($scope) {
        const changeRuleset = (ruleSet) => {
            uoplanner.ruleManager.setRules(ruleSet);
        };

        return {
            changeRuleset
        };
    }];

    return {
        templateUrl: 'views/rulesetSwitcher/rulesetSwitcher.html',
        controller: ruleSwitcherController,
        controllerAs: 'vm'
    };
});