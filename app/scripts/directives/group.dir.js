'use strict';

/**
 * @ngdoc directive
 * @name navEditorApp.directive:group
 * @description
 * # group
 */
angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('group', {
      views: {
        'groups': {
          template: '<div group><div>',
        }
      },
      url: '^/group/:areaid'
    });
  })
  .controller('GroupCtrl', function(AreaService, $stateParams) {
    AreaService.getGroups($stateParams.areaid).then(function(groups) {
      this.groups = groups;
    }.bind(this));
    this.$stateParams = $stateParams;
  })
  .directive('group', function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/group.view.html',
      controller: 'GroupCtrl',
      controllerAs: 'groupCtrl'
    };
  });

