const routes = require('express').Router();
const save = require('./save');

const saveGetHandler = (req, res) => {
	save.save(req.body, query => {
		res.status(200).json(query);
	});
};

routes.post('/save', saveGetHandler);

module.exports = routes;