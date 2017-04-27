const routes = require('express').Router();

const searchHandler = (req, res) => {
	res.render('search');
};

module.exports = routes.get('/', searchHandler);