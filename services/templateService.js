const templateModel = require('../models/templateModel'),
	numberTools = require('../utility/numberTools'),

	save = (skills, templateName, templateId, callback) => {

		let urlName = templateName
			.toLowerCase()
			.trim()
			.replace(/\s/g, "_")
			.replace(/\W/g, "")
			.replace(/_/g, "-")
			.replace(/--/g, "-");

		templateId = templateId ? templateId : numberTools.generateBase36();

		const rightNow = new Date(Date.now()),
			query = { 
				templateId: templateId, 
				name: templateName,
				urlName: urlName
			},
			update = { 
				templateId: templateId, 
				name: templateName,
				lastModified: rightNow,
				skills: skills
			},
			options = { 
				upsert: true, 
				new: true 
			};

		templateModel.findOneAndUpdate(query, update, options, (err, result) => {		
			callback(query);
			if (err) 
				console.log(err);
		});
	},

	get = (templateId, urlName, callback) => {
		const query = { templateId, urlName };

		templateModel.findOne(query, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				const viewModel = { 
					skills: result.skills, 
					name: result.name
				};
				callback(viewModel);
			}
		});
	};

module.exports = { save, get };