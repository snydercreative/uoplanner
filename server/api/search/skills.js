const templateService = require('../../../services/templateService');

const find = (skillList, callback) => {
	const skills = skillList.split(',');
	templateService.findBySkills(skills, callback);
};

module.exports = { find };