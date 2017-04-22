const templateModel = require('../models/templateModel'),
	numberTools = require('../utility/numberTools'),

	save = (skills, templateName, templateId) => {

		let urlName = templateName
			.toLowerCase()
			.trim()
			.replace(/\s/g, "_")
			.replace(/\W/g, "")
			.replace(/_/g, "-")
			.replace(/--/g, "-");

		const rightNow = new Date(Date.now()),
			query = { 
				templateId: templateId, 
				name: templateName,
				urlName: urlName
			},
			update = { 
				templateId: templateId ? templateId : numberTools.generateBase36(), 
				name: templateName,
				lastModified: rightNow,
				skills: skills
			},
			options = { 
				upsert: true, 
				new: true 
			};

		templateModel.findOneAndUpdate(query, update, options, (err, result) => {		
			console.log(err);
		});
	};

module.exports = { save };