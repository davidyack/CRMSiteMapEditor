'use strict';

/**
 * @ngdoc overview
 * @name navEditorApp
 * @description
 * # navEditorApp
 *
 * Main module of the application.
 */

require('angular');
var _ = require('underscore');
require('angular-bootstrap');
require('angular-szn-autocomplete');
require('angular-ui-router');
require('angular-loading-bar');
require('ngDraggable');
require('angular-animate');
require('flux-angular');

angular.module('underscore', [])
  .factory('_', function() {
    return _;
  })
  .factory('Underscore', function($window) {
    return _;
  });


angular
  .module('navEditorApp', ['templates-main','underscore', 'ui.router', 'ui.bootstrap', 'ngDraggable',
          'angular-szn-autocomplete', 'angular-loading-bar', 'ngAnimate', 'flux'])
  .config(function($urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
    cfpLoadingBarProvider.latencyThreshold = 500;
  });


require('./controllers/modal.ctrl');
require('./services/area.service');
require('./services/modal.service');

require('./directives/area.dir');
require('./directives/group.dir');
require('./directives/subarea.dir');
require('./directives/alert.dir');
require('./directives/actions');
require('./directives/uniqvalidator.dir');
