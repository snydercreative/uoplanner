const routes = require('express').Router();
const save = require('./save');

const saveGetHandler = (req, res) => {
	res.status(200).json(save.save(req.body));
};

routes.post('/save', saveGetHandler);

module.exports = routes;