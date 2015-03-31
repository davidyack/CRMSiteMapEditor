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
  .factory('EntityService', function ($http) {

    var entities;
    return {
      loadEntities: function () {
        $http({
          method: 'GET',
          url: '/api/entities'
        }).then(function(response) {
          return (entities = response.data);
        });
      },
      getEntities: function() {
        return entities;
      }
    };
  });
