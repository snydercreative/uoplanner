const routes = require('express').Router();
const home = require('./home');
const build = require('./build');
const share = require('./share');

routes.use('/', home);
routes.use('/share/:templateId/:urlName', share);
routes.use('/build', build);

module.exports = routes;