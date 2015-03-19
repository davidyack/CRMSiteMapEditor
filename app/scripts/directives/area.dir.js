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
        'main': {
          templateUrl: 'views/main.view.html',
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
      controllerAs: 'areaCtrl',
      link: function(scope, elem, attr, ctrl) {
         elem.bind('dragstart', function(e) {
            //do something here.
         });
      }
    };
  })
  .controller('AreaCtrl', function(AreaService, ModalService, $stateParams, $state, _) {
    AreaService.getAreas().then(function(areas) {
      this.areas = areas;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.onDropComplete = function(index, obj, evt) {
      if (_.indexOf(this.areas, obj) !== -1) {
        AreaService.reorderArea(index, obj);
      }
    };

    this.remove = function(area) {
      ModalService.remove('area', area).then(function() {
        AreaService.removeArea(area);
        if (area.Id === $stateParams.areaid) {
          $state.go('area');
        }

      });
    };

    this.update = function(oldArea) {
      ModalService.area(oldArea).then(function(newArea) {
        AreaService.updateArea(oldArea, newArea);
      });
    };

    this.addGroup = function(area) {
      ModalService.group().then(function(newGroup) {
        AreaService.addGroup(area, newGroup);
      });
    };


  });


