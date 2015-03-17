'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('area.group.subarea', {
      views: {
        'subarea': {
          template: '<div subarea><div>',
        }
      },
      url: '^/group/:areaid/:groupid'
    });
  })
  .controller('SubAreaCtrl', function(AreaService, ModalService, $stateParams) {
    AreaService.getSubAreas($stateParams.areaid, $stateParams.groupid).then(function(subareas) {
      this.subareas = subareas;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.remove = function(subArea) {
      ModalService.remove('sub area', subArea).then(function() {
        AreaService.removeSubArea($stateParams.areaid, $stateParams.groupid, subArea);
      });
    };

    this.update = function(oldSubArea) {
      ModalService.update('sub area', oldSubArea).then(function(newSubArea) {
        AreaService.updateSubArea($stateParams.areaid, $stateParams.groupid, oldSubArea, newSubArea);
      });
    };

  })
  .directive('subarea', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/subarea.view.html',
      controller: 'SubAreaCtrl',
      controllerAs: 'subAreaCtrl'
    };
  });

