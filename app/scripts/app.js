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
  .module('navEditorApp', ['underscore', 'ui.router', 'ui.bootstrap', 'ngDraggable']);


