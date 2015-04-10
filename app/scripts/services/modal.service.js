'use strict';

require('angular');

require('./icon.service');
require('./modal.service');
require('./url.service');
require('./entity.service');


/**
 * @ngdoc service
 * @name navEditorApp.modal.service
 * @description
 * # modal.service
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('ModalService', function($modal, EntityService, IconService, UrlService, _, AreaService) {

    var openRemoveModal = function(entityType, entity) {
      return $modal.open({
        templateUrl: 'views/modalremove.view.html',
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

    var areaModal = function(entity) {
      return $modal.open({
        templateUrl: 'views/area.modal.html',
        controller: 'ModalUpdateCtrl2',
        resolve: {
          entity: function() {
            return entity ? angular.extend({}, entity) : AreaService.newArea();
          },
          urls: UrlService.getUrls,
          isNew: function() {
            return entity === undefined;
          },
          icons: IconService.getIcons,
        }
      });
    };

    var subAreaModal = function(entity) {
      return $modal.open({
        templateUrl: 'views/subarea.modal.html',
        controller: 'ModalUpdateCtrl3',
        resolve: {
          entity: function() {
            return entity ? angular.extend({}, entity) : AreaService.newSubArea();
          },
          urls: UrlService.getUrls,
          isNew: function() {
            return entity === undefined;
          },
          icons: IconService.getIcons,
          entities: EntityService.getEntities
        }
      });
    };

    var groupModal = function(entity) {
      return $modal.open({
        templateUrl: 'views/group.modal.html',
        controller: 'ModalUpdateCtrl1',
        resolve: {
          entity: function() {
            return entity ? angular.extend({}, entity) : AreaService.newGroup();
          },
          urls: UrlService.getUrls,
          isNew: function() {
            return entity === undefined;
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
