const templateService = require('../../../services/templateService');

const get = (count, callback) => {
	templateService.recent(count, models => {
		callback(models);
	});
};

module.exports = { get };