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
  .factory('IconService', function ($http) {

    var icons;
    return {
      loadIcons: function () {
        $http({
          method: 'GET',
          url: '/api/icons'
        }).then(function(response) {
          return (icons = response.data.Icons);
        });
      },
      getIcons: function() {
        return icons;
      }
    };
  });
