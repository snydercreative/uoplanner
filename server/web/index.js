const routes = require('express').Router();
const home = require('./home');
const build = require('./build');
const share = require('./share');
const search = require('./search');

routes.use('/', home);
routes.use('/share/:templateId/:urlName', share);
routes.use('/build', build);
routes.use('/build/:templateId/:urlName', build);
routes.use('/search', search);

module.exports = routes;