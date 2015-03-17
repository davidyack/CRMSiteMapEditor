'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:add
 * @description
 * # add
 */
angular.module('navEditorApp')
  .directive('actions', function() {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/actions.view.html',
      controller: 'ActionsCtrl',
      controllerAs: 'actionsCtrl'
    };
  })
  .controller('ActionsCtrl', function($stateParams, $modal, AreaService, ModalService) {
    this.$stateParams = $stateParams;

    this.save = function() {
      AreaService.save();
    };

    this.addArea = function() {
      ModalService.add('area').then(function(area) {
        AreaService.addArea(area);
      });
    };

    this.addGroup = function() {
      ModalService.add('group').then(function(group) {
        AreaService.addGroup($stateParams.areaid, group);
      });
    };

    this.addSubArea = function() {
      ModalService.add('sub area').then(function(subarea) {
        AreaService.addSubArea($stateParams.areaid, $stateParams.groupid, subarea);
      });
    };
  });
