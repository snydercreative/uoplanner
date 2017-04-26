const naughtyService = require('../../../services/naughtyService');

const get = (templateName, callback) => {
	naughtyService.isNaughty(templateName, isNaughty => {
		callback(isNaughty);
	});
};

module.exports = { get };