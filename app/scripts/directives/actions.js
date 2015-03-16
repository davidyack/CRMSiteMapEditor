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
  .controller('ActionsCtrl', function($stateParams, $modal, AreaService) {
    this.$stateParams = $stateParams;

    this.save = function() {
      AreaService.save();
    };

    var openModal = function(title) {
      return $modal.open({
        templateUrl: '/views/modal.view.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          title: function() {
            return title;
          }
        }
      });
    };

    this.addArea = function() {
      openModal('Add area').result.then(function(area) {
        AreaService.addArea(area);
      });
    };

    this.addGroup = function() {
      openModal('Add group').result.then(function(group) {
        AreaService.addGroup($stateParams.areaid, group);
      });
    };

    this.addSubArea = function() {
      openModal('Add sub area').result.then(function(subarea) {
        AreaService.addSubArea($stateParams.areaid, $stateParams.groupid, subarea);
      });
    };


  })
  .controller('ModalInstanceCtrl', function($scope, $modalInstance, title) {
    $scope.title = title;

    $scope.ok = function() {
      $modalInstance.close($scope.entity);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
