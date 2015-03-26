'use strict';

require('angular');

angular.module('navEditorApp')
  .directive('uniqid', function(AreaService, _) {
    return {
        restrict: 'A',

        require: 'ngModel',

        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.uniqid = function(id) {
              var isItAdd = _.isUndefined(scope.oldEntity);
              var doesEntityExist = !_.isUndefined(AreaService['get' + attributes.uniqid](id));
              return !isItAdd || (isItAdd && !doesEntityExist);
            };
        }
    };
});
