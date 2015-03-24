'use strict';
var fs = require('fs');

module.exports = function(app) {
  app.get('/api/icons', function(req, res) {
      var icons = JSON.parse(fs.readFileSync(__dirname + '/icons.json', 'utf8'));
      res.json(icons);
  });
}


