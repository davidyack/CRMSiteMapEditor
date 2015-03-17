'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:areas
 * @description
 * # areas
 */


angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('area', {
      views: {
        'areas': {
          template: '<div areas><div>',
        }
      },
      url: ''
    });
  })
  .directive('areas', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/area.view.html',
      controller: 'AreaCtrl',
      controllerAs: 'areaCtrl'
    };
  })
  .controller('AreaCtrl', function(AreaService, ModalService, $stateParams, $state) {
    AreaService.getAreas().then(function(areas) {
      this.areas = areas;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.remove = function(area) {
      ModalService.remove('area', area).then(function() {
        AreaService.removeArea(area);
        if (area.Id === $stateParams.areaid) {
          $state.go('area');
        }

      });
    };

    this.update = function(oldArea) {
      ModalService.update('area', oldArea).then(function(newArea) {
        AreaService.updateArea(oldArea, newArea);
      });
    };


  });


