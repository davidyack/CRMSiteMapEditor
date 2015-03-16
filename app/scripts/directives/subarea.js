'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('group.subarea', {
      views: {
        'subarea': {
          template: '<div subarea><div>',
        }
      },
      url: '^/group/:areaid/:groupid'
    });
  })
  .controller('SubAreaCtrl', function(AreaService, $stateParams) {
    AreaService.getSubAreas($stateParams.areaid, $stateParams.groupid).then(function(subareas) {
      this.subareas = subareas;
    }.bind(this));
    this.$stateParams = $stateParams;
  })
  .directive('subarea', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/subarea.view.html',
      controller: 'SubAreaCtrl',
      controllerAs: 'subAreaCtrl'
    };
  });

