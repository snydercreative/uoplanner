const routes = require('express').Router();
const template = require('./template');
const search = require('./search');

routes.use('/template', template);

module.exports = routes;