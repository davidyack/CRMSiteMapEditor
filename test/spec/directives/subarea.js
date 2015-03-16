'use strict';

describe('Directive: subarea', function () {

  // load the directive's module
  beforeEach(module('navEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<subarea></subarea>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the subarea directive');
  }));
});
