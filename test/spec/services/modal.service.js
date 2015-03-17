'use strict';

describe('Service: modal.service', function () {

  // load the service's module
  beforeEach(module('navEditorApp'));

  // instantiate service
  var modal.service;
  beforeEach(inject(function (_modal.service_) {
    modal.service = _modal.service_;
  }));

  it('should do something', function () {
    expect(!!modal.service).toBe(true);
  });

});
