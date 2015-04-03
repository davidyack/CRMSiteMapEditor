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
  .config(function($stateProvider) {
    $stateProvider.state('area.group', {
      views: {
        'groups': {
          template: '<groups></groups>',
        }
      },
      url: '^/group/:areaid'
    });
  })
  .controller('GroupCtrl', function(AreaService, ModalService, $stateParams, $state, _, $templateCache, $scope, SettingsStore) {
    $scope.reorderingMode = SettingsStore.reorderingMode;
    $scope.$listenTo(SettingsStore, 'reorderingModeChanged', function() {
      $scope.reorderingMode = SettingsStore.reorderingMode;
    });
    this.groups = AreaService.getGroups($stateParams.areaid);
    this.$stateParams = $stateParams;

    this.onDropComplete = function(index, obj, evt) {
      if (_.indexOf(this.groups, obj) !== -1) {
        AreaService.reorderGroup(index, obj);
      }
    };

    this.remove = function(group) {
      ModalService.remove('group', group).then(function() {
        AreaService.removeGroup(group);
      });
    };

    this.update = function(oldGroup) {
      ModalService.group(oldGroup).then(function(newGroup) {
        AreaService.updateGroup(oldGroup, newGroup);
      });
    };

    this.addSubArea = function(group) {
      ModalService.subArea().then(function(subarea) {
        AreaService.addSubArea(group, subarea);
      });
    };

  })
  .directive('groups', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/group.view.html',
      controller: 'GroupCtrl',
      controllerAs: 'groupCtrl'
    };
  });

