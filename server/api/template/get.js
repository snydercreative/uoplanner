const templateService = require('../../../services/templateService');

const get = (templateId, urlName, callback) => {
	templateService.get(templateId, urlName, foundRecord => {
		callback(foundRecord);
	});
};

module.exports = { get };