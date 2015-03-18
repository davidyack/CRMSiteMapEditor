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
      ModalService.area().then(function(newArea) {
        AreaService.addArea(newArea);
      });
    };
  });
