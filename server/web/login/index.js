const router = require('express').Router();

const loginHandler = (req, res) => {
	res.render('login');
};

module.exports = router.get('/', loginHandler);