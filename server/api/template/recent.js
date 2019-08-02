const templateService = require('../../../services/templateService');

const get = (count, ruleSet, callback) => {
	templateService.recent(count, ruleSet, models => {
		callback(models);
	});
};

module.exports = { get };