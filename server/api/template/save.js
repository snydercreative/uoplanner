const templateService = require('../../../services/templateService');

const save = (templateJson, callback) => {
	templateService.save(templateJson.skills, templateJson.templateName, templateJson.templateId, templateJson.ruleSet, query => {
		callback(query);
	});
};

module.exports = { save };