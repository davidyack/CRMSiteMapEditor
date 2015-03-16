'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:areas
 * @description
 * # areas
 */


angular.module('navEditorApp')
  .directive('areas', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/area.view.html',
      controller: 'AreaCtrl',
      controllerAs: 'areaCtrl'
    };
  })
  .controller('AreaCtrl', function(AreaService, $stateParams) {
    AreaService.getAreas().then(function(areas) {
      this.areas = areas;
    }.bind(this));
    this.$stateParams = $stateParams;
  });


