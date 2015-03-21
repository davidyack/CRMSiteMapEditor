'use strict';

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
      loadEnities: function () {
        $http({
          method: 'GET',
          url: '/api/entities'
        }).then(function(response) {
          entities = response.data.Enities;
        });
      },
      getEntities: function() {
        return entities;
      }
    };
  });
