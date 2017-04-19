const router = require('express').Router();

const homeHandler = (req, res) => {
	res.render('home');
};

module.exports = router.get('/', homeHandler);