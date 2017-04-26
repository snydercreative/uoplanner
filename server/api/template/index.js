const routes = require('express').Router();
const save = require('./save');
const get = require('./get');
const recent = require('./recent');
const naughty = require('./naughty');

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

const recentHandler = (req, res) => {
	const count = 8;

	recent.get(count, results => {
		res.status(200).json(results);
	});
};

const naughtyHandler = (req, res) => {
	const templateName = req.params.templateName;

	naughty.get(templateName, isNaughty => {
		res.status(200).json({ isNaughty });
	});
};

routes.post('/save', saveHandler);
routes.get('/get/:templateId/:urlName', getHandler);
routes.get('/recent', recentHandler);
routes.get('/naughty/:templateName', naughtyHandler);

module.exports = routes;