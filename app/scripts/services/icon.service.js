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

var iconServiceUrl = '/api/icons';
 if (window.CRMSiteMapEditorSiteMapIconServiceURL != null)
  iconServiceUrl = CRMSiteMapEditorSiteMapIconServiceURL;

    var icons;
    return {
      loadIcons: function () {
        $http({
          method: 'GET',
          url: iconServiceUrl
        }).then(function(response) {
          return (icons = response.data.Icons);
        });
      },
      getIcons: function() {
        return icons;
      }
    };
  });
