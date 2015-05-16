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
  .controller('ActionsCtrl', function(AreaService, ModalService, $state, AlertsActions, $scope) {
    this.changeState = function() {
      $state.go('tablet');
    };

    this.showHelp = function() {
      $state.go('help');
    };

    this.save = function() {
      this.saving = true;
      AreaService.save().then(function(resp) {
        this.saving = false;
        if (!resp.data.Success) {
          AlertsActions.add({
            msg: resp.data.ErrorMessage + '. Ref: ' + resp.data.ErrorReference +
              '. ProgressTag: ' + resp.data.ProgressTag,
            type: 'danger'
          });
        }
      }.bind(this));
    };

    this.download = function() {
      this.downloading = true;
      AreaService.download().then(function() {
        this.downloading = false;
      }.bind(this));
    };

    this.addArea = function() {
      ModalService.area().then(function(newArea) {
        AreaService.addArea(newArea);
        $state.go('area.group', {areaid: newArea.Id});
      });
    };
  });
