'use strict';
var fs = require('fs');

module.exports = function(app) {

  app.post('/api/sitemapdownload', function(req, res) {
      res.set('Content-Type', 'text/xml');
      // res.set('Content-disposition', 'attachment; filename=download.xml');
      // var areas = fs.readFileSync(__dirname + '/download.xml', 'utf8');
      // res.send(areas);
      res.download(__dirname + '/download.xml');
  });

};

