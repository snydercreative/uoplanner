const routes = require('express').Router(),
	skills = require('./skills'),
	names = require('./names');

const skillSearchHandler = (req, res) => {
		skills.find(req.query.q, (err, results) => {
			res.status(200).json(results);
		});
	},
	
	nameSearchHandler = (req, res) => {
		names.find(req.query.q, results => {
			res.status(200).json(results);
		});
	};

routes.get('/skills', skillSearchHandler);
routes.get('/names', nameSearchHandler);

module.exports = routes;