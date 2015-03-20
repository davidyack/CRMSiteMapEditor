'use strict';


var json = JSON.stringify({
    'Areas': [{
      'Title': 'Area1',
      'Id': 'Area1',
      'Groups': [{
        'Title': 'Group1_1',
        'Id': 'Group1_1',
        'SubAreas': [{
          'Title': 'SubArea1_1_1',
          'Id': 'SubArea1_1_1'
        },{
          'Title': 'SubArea1_1_2',
          'Id': 'SubARea1_1_2'
        }]
      }]
    },{
      'Title': 'Area2',
      'Id': 'Area2',
      'Groups': [{
        'Title': 'Group2_1',
        'Id': 'Group2_1',
        'SubAreas': [{
          'Title': 'SubArea2_1_1',
          'Id': 'SubArea2_1_1'
        },{
          'Title': 'SubArea2_1_2',
          'Id': 'SubARea2_1_2'
        }]
      }]
    }]
  });

describe('Service: areas', function () {

  // load the service's module
  beforeEach(module('navEditorApp'));

  // instantiate service
  var AreaService;
  beforeEach(inject(function (_AreaService_) {
    AreaService = _AreaService_;
    AreaService._transformResponse(json);
  }));

  it('should build 2 indexes by Areas', function () {

    expect(_.keys(AreaService._indexes.Areas).length).toBe(2);
  });

  it('should get an Area by id', function () {
    expect(!!AreaService).toBe(true);
  });

});
