'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .controller('SubAreaCtrl', function(AreaService, ModalService, $stateParams, $scope, _) {
    AreaService.getSubAreas($stateParams.areaid, $scope.group.Id).then(function(subareas) {
      this.subareas = subareas;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.onDropComplete = function(index, obj, evt) {
      var otherObj = this.subareas[index];
      var otherIndex = this.subareas.indexOf(obj);
      this.subareas[index] = obj;
      this.subareas[otherIndex] = otherObj;
      AreaService.updateSubAreas($stateParams.areaid, $scope.group.Id, this.subareas);
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

