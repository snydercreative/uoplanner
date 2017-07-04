const routes = require('express').Router();
const template = require('./template');
const search = require('./search');

routes.use('/template', template);
routes.use('/search', search);

module.exports = routes;