'use strict';

/**
 * @ngdoc service
 * @name navEditorApp.modal.service
 * @description
 * # modal.service
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('ModalService', function($modal) {
    var openAddModal = function(entityType) {
      return $modal.open({
        templateUrl: '/views/modaladd.view.html',
        controller: 'ModalAddCtrl',
        resolve: {
          entityType: function() {
            return entityType;
          }
        }
      });
    };

    var openUpdateModal = function(entityType, oldEntity) {
      return $modal.open({
        templateUrl: '/views/modalupdate.view.html',
        controller: 'ModalUpdateCtrl',
        resolve: {
          entityType: function() {
            return entityType;
          },
          oldEntity: function() {
            return oldEntity;
          }
        }
      });
    };

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

    return {
      add: function(entityType) {
        return openAddModal(entityType).result;
      },
      remove: function(entityType, entity) {
        return openRemoveModal(entityType, entity).result;
      },
      update: function(entityType, oldEntity) {
        return openUpdateModal(entityType, oldEntity).result;
      }
    };
  });
