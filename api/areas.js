'use strict';
var fs = require('fs');

module.exports = function(app) {

  app.get('/api/areas', function(req, res) {
    var areas = JSON.parse(fs.readFileSync(__dirname + '/areas.json', 'utf8'));
    res.json(areas);
  });

  app.post('/api/areas', function(req, res) {
    res.json(req.body);
  });

};

