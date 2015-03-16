'use strict';

describe('Service: areas', function () {

  // load the service's module
  beforeEach(module('navEditorApp'));

  // instantiate service
  var areas;
  beforeEach(inject(function (_areas_) {
    areas = _areas_;
  }));

  it('should do something', function () {
    expect(!!areas).toBe(true);
  });

});
