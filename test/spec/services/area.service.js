'use strict';

var json = {
    'Areas': [{
      'Title': 'Area1',
      'Id': 'Area1',
      'Groups': [{
        'Title': 'Group11',
        'Id': 'Group11',
        'SubAreas': [{
          'Title': 'SubArea111',
          'Id': 'SubArea111'
        },{
          'Title': 'SubArea112',
          'Id': 'SubARea112'
        }]
      }]
    },{
      'Title': 'Area2',
      'Id': 'Area2',
      'Groups': [{
        'Title': 'Group21',
        'Id': 'Group21',
        'SubAreas': [{
          'Title': 'SubArea2_1_1',
          'Id': 'SubArea2_1_1'
        },{
          'Title': 'SubArea2_1_2',
          'Id': 'SubARea2_1_2'
        }]
      }]
    },{
      'Title': 'Area3',
      'Id': 'Area3'
    }]
  };

describe('Service: areas', function () {

  // load the service's module
  beforeEach(module('navEditorApp'));

  // instantiate service
  var AreaService, _, _indexes;
  beforeEach(inject(function (_AreaService_, _Underscore_) {
    AreaService = _AreaService_;
    _ = _Underscore_;
    AreaService._transformResponse(JSON.stringify(json));
    _indexes = AreaService._indexes;
  }));

  it('getArea should return area by Id', function () {
    var areas = AreaService.getAreas();
    expect(AreaService.getArea('Area1').Id).toBe(areas[0].Id);
    expect(AreaService.getArea('Area2').Id).toBe(areas[1].Id);
  });

  it('addArea should expaned area and added it into areas, indexes', function () {
    var areas = AreaService.getAreas();
    AreaService.addArea({Id: 'Area'});
    var area = AreaService.getArea('Area');

    expect(areas[areas.length - 1].Id).toBe(area.Id);
    expect(area.__AreaId__).toBeDefined();
    expect(area.__AreaId__).toBe(area.Id);
    expect(_indexes.PKAreas[area.Id]).toBe(area);
  });

  it('updateArea should update in areas and indexes', function() {
    var areas = AreaService.getAreas();
    var oldA = areas[0];
    var newA = {Id: 'Area'};
    AreaService.updateArea(oldA, newA);
    expect(areas[0]).toBe(newA);
    expect(_indexes.PKAreas[oldA.Id]).not.toBeDefined();
    expect(_indexes.PKAreas[newA.Id]).toBe(newA);
  });

  it('reorderArea should reorder areas', function() {
    var areas = AreaService.getAreas();
    var area = AreaService.getArea('Area1');
    AreaService.reorderArea(2, area);
    expect(AreaService.getArea('Area2').Id).toBe(areas[0].Id);
    expect(AreaService.getArea('Area3').Id).toBe(areas[1].Id);
    expect(AreaService.getArea('Area1').Id).toBe(areas[2].Id);
  });

  it('removeArea should remove area from areas, remove group and subarea from indexes', function() {
    // var areas = AreaService.getAreas();
    var area = AreaService.getArea('Area1');
    AreaService.removeArea(area);
    expect(AreaService.getArea('Area1')).not.toBeDefined();
    expect(_indexes.PKAreas[area.Id]).not.toBeDefined();

    expect(_indexes.PKGroups.Group11).not.toBeDefined();

    expect(_indexes.PKSubAreas.SubArea111).not.toBeDefined();
    expect(_indexes.PKSubAreas.SubArea112).not.toBeDefined();
  });


});
