'use strict';

/**
 * @ngdoc function
 * @name navEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the navEditorApp
 */
angular.module('navEditorApp')
  .controller('ModalUpdateCtrl', function($scope, $modalInstance, oldEntity) {
    $scope.oldEntity = oldEntity;
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
