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
  .factory('UrlService', function ($http) {

    var urls;
    return {
      loadUrls: function () {
        $http({
          method: 'GET',
          url: 'api/urls'
        }).then(function(response) {
          return (urls = response.data);
        });
      },
      getUrls: function() {
        return urls;
      }
    };
  });
