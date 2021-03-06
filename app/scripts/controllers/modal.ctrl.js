'use strict';

require('angular');

/**
 * @ngdoc function
 * @name navEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the navEditorApp
 */
angular.module('navEditorApp')
  .controller('ModalUpdateCtrl1', function($scope, $modalInstance, _, entity, urls, isNew) {
    $scope.newEntity = entity;
    $scope.isNew = isNew;
    $scope.urlSearch = function(query, deferred) {
        var results = _.map(_.filter(urls, function(item) {
          return (item.DisplayName.indexOf(query) !== -1);
        }), function(item) {
          return {
            value: item.DisplayName,
            name: item.Name
          };
        });
        deferred.resolve({results: results});
    };
    $scope.urlOptions = {
        searchMethod: 'urlSearch',
        templateUrl: 'views/autocomplete.view.html',
        onSelect: function(item) {
          $scope.newEntity.Url = item.name;
        }
    };
    $scope.ok = function(isValid) {
        if (isValid) {
            $modalInstance.close($scope.newEntity);
        }
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
  })
  .controller('ModalUpdateCtrl2', function($scope, $modalInstance, _, $controller, entity, urls, isNew, icons) {
    angular.extend(this, $controller('ModalUpdateCtrl1', {$scope: $scope, $modalInstance: $modalInstance, entity: entity, urls: urls, isNew: isNew}));
    $scope.iconSearch = function(query, deferred) {
        var results = _.map(_.filter(icons, function(item) {
          return (item.DisplayName.indexOf(query) !== -1);
        }), function(item) {
          return {
            value: item.DisplayName,
            name: item.Name
          };
        });
        deferred.resolve({results: results});
    };
    $scope.iconOptions = {
        searchMethod: 'iconSearch',
        templateUrl: 'views/autocomplete.view.html',
        onSelect: function(item) {
          $scope.newEntity.Icon = item.name;
        }
    };
  })
  .controller('ModalUpdateCtrl3', function($scope, $modalInstance, _, $controller, entity, urls, isNew, icons, entities) {
    angular.extend(this, $controller('ModalUpdateCtrl2', {$scope: $scope, $modalInstance: $modalInstance, entity: entity, urls: urls, isNew:isNew, icons:icons}));
    $scope.entitySearch = function(query, deferred) {
        var results = _.map(_.filter(entities, function(item) {
          return (item.LogicalName.indexOf(query) !== -1);
        }), function(item) {
          return {
            value: item.DisplayName,
            name: item.LogicalName
          };
        });
        deferred.resolve({results: results});
    };
    $scope.entityOptions = {
        searchMethod: 'entitySearch',
        templateUrl: 'views/autocomplete.view.html',
        onSelect: function(item) {
          $scope.newEntity.Entity = item.name;
        }
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

