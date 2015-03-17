'use strict';

/**
 * @ngdoc overview
 * @name navEditorApp
 * @description
 * # navEditorApp
 *
 * Main module of the application.
 */
angular.module('underscore', [])
  .factory('_', function() {
    return window._;
  });

angular
  .module('navEditorApp', ['underscore', 'ui.router', 'ui.bootstrap'])
  .config(function($locationProvider) {
    // $urlRouterProvider.otherwise('');
    $locationProvider.html5Mode(true)
  })
  .run(function($state) {
    // $state.go($state.current.name || 'area');
  });


