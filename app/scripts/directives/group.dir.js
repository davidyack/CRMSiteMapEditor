'use strict';

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
  .controller('GroupCtrl', function(AreaService, ModalService, $stateParams, $state) {
    AreaService.getGroups($stateParams.areaid).then(function(groups) {
      this.groups = groups;
    }.bind(this));
    this.$stateParams = $stateParams;

    this.remove = function(group) {
      ModalService.remove('group', group).then(function() {
        AreaService.removeGroup($stateParams.areaid, group);
      });
    };

    this.update = function(oldGroup) {
      ModalService.group(oldGroup).then(function(newGroup) {
        AreaService.updateGroup($stateParams.areaid, oldGroup, newGroup);
      });
    };

    this.addSubArea = function(group) {
      ModalService.subArea().then(function(subarea) {
        AreaService.addSubArea($stateParams.areaid, group.Id, subarea);
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

