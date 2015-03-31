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
  .factory('UrlService', function ($http, $window) {
    var urls;
    return {
      loadUrls: function () {
        $http({
          method: 'GET',
          url: $window.CRMSiteMapEditorSiteMapUrlServiceURL || '/api/urls'
        }).then(function(response) {
          return (urls = response.data);
        });
      },
      getUrls: function() {
        return urls;
      }
    };
  });
