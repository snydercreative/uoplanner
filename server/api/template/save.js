const templateService = require('../../../services/templateService');

const save = (templateJson, callback) => {
	
	console.log(templateJson);

	templateService.save(templateJson.skills, templateJson.templateName, templateJson.templateId, templateId => {
		callback(templateId);
	});
};

module.exports = { save };