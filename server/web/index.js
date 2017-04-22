const routes = require('express').Router();
const home = require('./home');
const build = require('./build');

routes.use('/', home);
routes.use('/build', build);

module.exports = routes;