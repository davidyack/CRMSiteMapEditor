'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .controller('SubAreaCtrl', function(AreaService, ModalService, $stateParams, $scope) {
    AreaService.getSubAreas($stateParams.areaid, $scope.group.Id).then(function(subareas) {
      this.subareas = subareas;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.remove = function(subArea) {
      ModalService.remove('sub area', subArea).then(function() {
        AreaService.removeSubArea($stateParams.areaid, $scope.group.Id, subArea);
      });
    };

    this.update = function(oldSubArea) {
      ModalService.update('sub area', oldSubArea).then(function(newSubArea) {
        AreaService.updateSubArea($stateParams.areaid, $scope.group.Id, oldSubArea, newSubArea);
      });
    };

  })
  .directive('subareas', function () {
    return {
      scope: {
        group: '='
      },
      replace: true,
      templateUrl: 'views/subarea.view.html',
      controller: 'SubAreaCtrl',
      controllerAs: 'subAreaCtrl'
    };
  });

