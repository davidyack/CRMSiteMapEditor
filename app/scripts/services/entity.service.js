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

 var entityServiceUrl = '/api/entities';
 if (window.CRMSiteMapEditorSiteMapEntityServiceURL != null)
  entityServiceUrl = CRMSiteMapEditorSiteMapEntityServiceURL;

    var entities;
    return {
      loadEntities: function () {
        $http({
          method: 'GET',
          url: entityServiceUrl
        }).then(function(response) {
          return (entities = response.data.Enities);
        });
      },
      getEntities: function() {
        return entities;
      }
    };
  });
