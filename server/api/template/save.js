const templateService = require('../../../services/templateService');

const save = (templateJson) => {
	
	console.log(templateJson);

	templateService.save(templateJson.skills, templateJson.templateName, templateJson.templateId);
};

module.exports = { save };