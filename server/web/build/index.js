const router = require('express').Router();

const buildHandler = (req, res) => {
	res.render('build');
};

module.exports = router.get('/', buildHandler);