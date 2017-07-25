const routes = require('express').Router();
const home = require('./home');
const build = require('./build');
const share = require('./share');
const search = require('./search');
const login = require('./login');

routes.use('/', home);
routes.use('/share/:templateId/:urlName', share);
routes.use('/build', build);
routes.use('/search', search);
routes.use('/login', login);

module.exports = routes;