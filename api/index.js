'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require('./areas')(app);
require('./entities')(app);
require('./icons')(app);
require('./urls')(app);

module.exports = app;
