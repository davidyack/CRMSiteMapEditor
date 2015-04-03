'use strict';

require('angular');
require('angular-ui-router');

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .controller('SubAreaCtrl', function(AreaService, ModalService, $stateParams, $scope, _, SettingsStore) {
    $scope.reorderingMode = SettingsStore.reorderingMode;
    $scope.$listenTo(SettingsStore, 'reorderingModeChanged', function() {
      $scope.reorderingMode = SettingsStore.reorderingMode;
    });
    this.subareas = AreaService.getSubAreas($stateParams.areaid, $scope.group.Id);
    this.$stateParams = $stateParams;

    this.onDropComplete = function(index, obj, evt) {
      if (_.indexOf(this.subareas, obj) !== -1) {
        AreaService.reorderSubArea(index, obj);
      }
    };

    this.remove = function(subArea) {
      ModalService.remove('sub area', subArea).then(function() {
        AreaService.removeSubArea(subArea);
      });
    };

    this.update = function(oldSubArea) {
      ModalService.subArea(oldSubArea).then(function(newSubArea) {
        AreaService.updateSubArea(oldSubArea, newSubArea);
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

