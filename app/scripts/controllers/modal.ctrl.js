'use strict';

/**
 * @ngdoc function
 * @name navEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the navEditorApp
 */
angular.module('navEditorApp')
  .controller('ModalAddCtrl', function($scope, $modalInstance, entityType) {
    $scope.entityType = entityType;

    $scope.ok = function(isValid) {
      if (isValid) {
        $modalInstance.close($scope.entity);
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('ModalUpdateCtrl', function($scope, $modalInstance, entityType, oldEntity) {
    $scope.entityType = entityType;
    $scope.newEntity = angular.extend({}, oldEntity);

    $scope.ok = function(isValid) {
      if (isValid) {
        $modalInstance.close($scope.newEntity);
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  })
 .controller('ModalRemoveCtrl', function($scope, $modalInstance, entityType, entity) {
    $scope.entityType = entityType;
    $scope.entity = entity;

    $scope.ok = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
