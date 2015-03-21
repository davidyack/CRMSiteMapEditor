'use strict';

/**
 * @ngdoc service
 * @name navEditorApp.modal.service
 * @description
 * # modal.service
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('ModalService', function($modal, EntityService) {

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
        controller: function($scope, $modalInstance, oldEntity, entities) {
            $scope.oldEntity = oldEntity;
            $scope.entities = entities;
            $scope.newEntity = angular.extend({}, oldEntity);

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
          entities: EntityService.getEntities
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
