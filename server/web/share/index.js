const router = require('express').Router();

const homeHandler = (req, res) => {
	res.render('share');
};

module.exports = router.get('/', homeHandler);