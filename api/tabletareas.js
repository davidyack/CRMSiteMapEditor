'use strict';
var fs = require('fs');

module.exports = function(app) {

  app.get('/api/tabletareas', function(req, res) {
    res.json([
      { "ImageUrl": "http://someurl",
        "DisplayName": "Display Account",
        "LogicalName": "Logical Account"
      },{
        "DisplayName": "Display Activity",
        "LogicalName": "Logical Activity"
      }
    ]);
  });


};

