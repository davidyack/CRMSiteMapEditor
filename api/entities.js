'use strict';
var fs = require('fs');

module.exports = function(app) {
  app.get('/api/entities', function(req, res) {
      var entities = JSON.parse(fs.readFileSync(__dirname + '/entities.json', 'utf8'));
      res.json(entities);
  });
}


