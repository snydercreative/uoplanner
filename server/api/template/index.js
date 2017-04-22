const routes = require('express').Router();
const save = require('./save');

const saveGetHandler = (req, res) => {
	save.save(req.body, templateId => {
		res.status(200).json(templateId);
	});
};

routes.post('/save', saveGetHandler);

module.exports = routes;