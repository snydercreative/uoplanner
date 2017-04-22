const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const apiRoutes = require('./server/api');
const webRoutes = require('./server/web');

mongoose.connect('mongodb://127.0.0.1:27017/UOPlanner');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

app.set('view engine', 'pug');
app.set('views', ['server/web/views']);

app.listen(1234);
