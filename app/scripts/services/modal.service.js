'use strict';

/**
 * @ngdoc service
 * @name navEditorApp.modal.service
 * @description
 * # modal.service
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('ModalService', function($modal, EntityService, IconService, UrlService, _) {

    var openRemoveModal = function(entityType, entity) {
      return $modal.open({
        templateUrl: '/views/modalremove.view.html',
        controller: 'ModalRemoveCtrl',
        resolve: {
          entityType: function() {
            return entityType;
          },
          entity: function() {
            return entity;
          }
        }
      });
    };

    var areaModal = function(oldEntity) {
      return $modal.open({
        templateUrl: '/views/area.modal.html',
        controller: 'ModalUpdateCtrl',
        resolve: {
          oldEntity: function() {
            return oldEntity;
          }
        }
      });
    };

    var subAreaModal = function(oldEntity) {
      return $modal.open({
        templateUrl: '/views/subarea.modal.html',
        controller: function($scope, $modalInstance, oldEntity, entities, urls, icons) {
            $scope.oldEntity = oldEntity;
            $scope.entities = entities;
            $scope.newEntity = angular.extend({}, oldEntity);
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
                templateUrl: '/views/autocomplete.view.html',
                onSelect: function(item) {
                  $scope.newEntity.Url = {
                    DisplayName: item.value,
                    Name: item.name
                  };
                }
            };
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
                templateUrl: '/views/autocomplete.view.html',
                onSelect: function(item) {
                  $scope.newEntity.Icon = {
                    DisplayName: item.value,
                    Name: item.name
                  };
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
        },
        resolve: {
          oldEntity: function() {
            return oldEntity;
          },
          entities: EntityService.getEntities,
          urls: UrlService.getUrls,
          icons: IconService.getIcons
        }
      });
    };

    var groupModal = function(oldEntity) {
      return $modal.open({
        templateUrl: '/views/group.modal.html',
        controller: 'ModalUpdateCtrl',
        resolve: {
          oldEntity: function() {
            return oldEntity;
          }
        }
      });
    };

    return {
      area: function(oldEntity) {
        return areaModal(oldEntity).result;
      },
      group: function(oldEntity) {
        return groupModal(oldEntity).result;
      },
      subArea: function(oldEntity) {
        return subAreaModal(oldEntity).result;
      },
      remove: function(entityType, entity) {
        return openRemoveModal(entityType, entity).result;
      },
    };
  });
