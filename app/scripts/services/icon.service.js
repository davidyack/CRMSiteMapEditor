'use strict';

require('angular');

/**
 * @ngdoc service
 * @name navEditorApp.entity.service
 * @description
 * # entity.service
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('IconService', function ($http, $window) {
    var icons;
    return {
      loadIcons: function () {
        $http({
          method: 'GET',
          url: $window.CRMSiteMapEditorSiteMapIconServiceURL || '/api/icons'
        }).then(function(response) {
          return (icons = response.data);
        });
      },
      getIcons: function() {
        return icons;
      }
    };
  });
