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
        controller: 'ModalUpdateCtrl2',
        resolve: {
          oldEntity: function() {
            return oldEntity;
          },
          urls: UrlService.getUrls,
          icons: IconService.getIcons,
        }
      });
    };

    var subAreaModal = function(oldEntity) {
      return $modal.open({
        templateUrl: '/views/subarea.modal.html',
        controller: 'ModalUpdateCtrl3',
        resolve: {
          oldEntity: function() {
            return oldEntity;
          },
          urls: UrlService.getUrls,
          icons: IconService.getIcons,
          entities: EntityService.getEntities
        }
      });
    };

    var groupModal = function(oldEntity) {
      return $modal.open({
        templateUrl: '/views/group.modal.html',
        controller: 'ModalUpdateCtrl1',
        resolve: {
          oldEntity: function() {
            return oldEntity;
          },
          urls: UrlService.getUrls
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
