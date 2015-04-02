'use strict';

require('angular');

/**
 * @ngdoc directive
 * @name navEditorApp.directive:add
 * @description
 * # add
 */
angular.module('navEditorApp')
  .directive('actions', function() {
    return {
      scope: {},
      replace: true,
      templateUrl: 'views/actions.view.html',
      controller: 'ActionsCtrl',
      controllerAs: 'actionsCtrl'
    };
  })
  .controller('ActionsCtrl', function(AreaService, ModalService, $state) {
    this.save = function() {
      this.saving = true;
      AreaService.save().then(function() {
        this.saving = false;
      }.bind(this));
    };

    this.download = function() {
      this.downloading = true;
      AreaService.download().then(function() {
        this.downloading = false;
      }.bind(this));
    };

    this.addarea = function() {
      ModalService.area().then(function(newarea) {
        AreaService.addarea(newarea);
        $state.go('area.group', {areaid: newarea.id});
      });
    };
  });
