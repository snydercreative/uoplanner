const routes = require('express').Router();
const home = require('./home');

routes.use('/', home);

module.exports = routes;