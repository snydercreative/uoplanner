const routes = require('express').Router();
const save = require('./save');
const get = require('./get');

const saveHandler = (req, res) => {
	save.save(req.body, query => {
		res.status(200).json(query);
	});
};

const getHandler = (req, res) => {
	const templateId = req.params.templateId,
		urlName = req.params.urlName;

	get.get(templateId, urlName, foundRecord => {
		res.status(200).json(foundRecord);
	});
};

routes.post('/save', saveHandler);
routes.get('/get/:templateId/:urlName', getHandler);

module.exports = routes;