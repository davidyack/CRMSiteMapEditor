'use strict';

require('angular');
require('angular-ui-router');


/**
 * @ngdoc directive
 * @name navEditorApp.directive:areas
 * @description
 * # areas
 */


angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('area', {
      views: {
        'main': {
          templateUrl: 'views/main.view.html',
        }
      },
      url: '/',
      resolve: {
        areaService: 'AreaService',
        areas: function(areaService) {
          return areaService.loadAreas();
        },
        entityService: 'EntityService',
        entities: function(entityService) {
          return entityService.loadEntities();
        },
        iconService: 'IconService',
        icons: function(iconService) {
          return iconService.loadIcons();
        },
        urlService: 'UrlService',
        urls: function(urlService) {
          return urlService.loadUrls();
        }
      }
    });
  })
  .directive('areas', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/area.view.html',
      controller: 'AreaCtrl',
      controllerAs: 'areaCtrl'
    };
  })
  .controller('AreaCtrl', function(AreaService, ModalService, $stateParams, $state, _) {
    this.areas = AreaService.getAreas();
    this.$stateParams = $stateParams;
    this.allowDrop = true;

    this.onDropComplete = function(index, obj, evt) {
      if (this.AllowDrop)
      {
        if (_.indexOf(this.areas, obj) !== -1) {
          AreaService.reorderArea(index, obj);
        }
      }
    };

    this.remove = function(area) {
      ModalService.remove('area', area).then(function() {
        AreaService.removeArea(area);
        if (area.Id === $stateParams.areaid) {
          $state.go('area');
        }

      });
    };

    this.update = function(oldArea) {
      this.allowDrop=false;
      ModalService.area(oldArea).then(function(newArea) {
        this.allowDrop=true;
        AreaService.updateArea(oldArea, newArea);
      });
    };

    this.addGroup = function(area) {
      this.allowDrop=false;
      ModalService.group().then(function(newGroup) {
        this.allowDrop=true;
        AreaService.addGroup(area, newGroup);
      });
    };


  });


