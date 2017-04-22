const routes = require('express').Router();
const template = require('./template');

routes.use('/template', template);

module.exports = routes;