'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var fs = require('fs');

app.get('/api/areas', function(req, res) {
    var areas = JSON.parse(fs.readFileSync(__dirname + '/areas.json', 'utf8'));
    res.json(areas);
});

app.post('/api/areas', function(req, res) {
    res.json(req.body);
});

module.exports = app;
