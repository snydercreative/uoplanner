const _ = require('lodash');
const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	templateSchema = new Schema({
		templateId: { type: String, index: true },
		name: String,
		urlName: String,
		ruleSet: String,
		skills: Array,
		lastModified: Date
	});

// No arrow syntax? Here's why: http://stackoverflow.com/a/36795534/67911

templateSchema.methods.addSkill = function(skill, callback) {
	this.skills.push(skill);
	this.lastModified = new Date();

	callback(this);
};

module.exports = mongoose.model('templates', templateSchema);