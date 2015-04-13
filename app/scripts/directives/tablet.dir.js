'use strict';

require('angular');
require('angular-ui-router');


/**
 * @ngdoc directive
 * @name navEditorApp.directive:tablet
 * @description
 * # areas
 */


angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('tablet', {
      views: {
        'main': {
          templateUrl: 'views/tablet.view.html',
        }
      },
      url: '/tablet'
    });
  });


angular.module('navEditorApp')
  .factory('TabletAreasActions', function(flux, $resource, $window) {
    var TabletAreas = $resource($window.CRMSiteMapEditorTabletAreas || '/api/tabletareas');
    return {
      load: function() {
        flux.dispatch('tabletAreasLoading');
        var areas = TabletAreas.query(function() {
          flux.dispatch('tabletAreasLoaded', areas);
        });
      }
    };
  });

angular.module('navEditorApp')
  .store('TabletAreasStore', ['flux', function(flux) {
    var state = flux.immutable({
      areas: [],
      meta: {
        loaded: false,
        loading: false
      }
    });
    return {
      handlers: {
        'tabletAreasLoaded': 'loaded',
        'tabletAreasLoading': 'loading'
      },
      loading: function() {
        state = state.meta.set('loading', true);
        this.emitChange();
      },
      loaded: function(areas) {
        state = state.areas.splice(0, state.areas.length);
        state = state.areas.concat(areas);
        state = state.meta.set('loaded', true);
        state = state.meta.set('loading', false);
        this.emitChange();
      },
      exports: {
        get areas() {
          return state.areas;
        },
        get meta() {
          return state.meta;
        }
      }
    };
  }]);

angular.module('navEditorApp')
  .directive('tabletareas', function() {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/tabletarea.view.html',
      controller: function($scope, TabletAreasStore, TabletAreasActions) {
        var meta = TabletAreasStore.meta;
        if (!meta.loading && !meta.loaded) {
          TabletAreasActions.load();
        }
        $scope.areas = TabletAreasStore.areas;
        $scope.$listenTo(TabletAreasStore, function() {
          $scope.areas = TabletAreasStore.areas;
        });
      }
    };
  });


angular.module('navEditorApp')
  .directive('tabletactions', function() {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/tabletactions.view.html',
      controller: function($state, $scope) {
        $scope.changeState = function() {
          $state.go('area');
        };
      }
    };
  });


