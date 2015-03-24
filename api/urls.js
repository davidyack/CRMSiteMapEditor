'use strict';
var fs = require('fs');

module.exports = function(app) {
  app.get('/api/urls', function(req, res) {
      var urls = JSON.parse(fs.readFileSync(__dirname + '/urls.json', 'utf8'));
      res.json(urls);
  });
}


