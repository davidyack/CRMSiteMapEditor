'use strict';

/**
 * @ngdoc service
 * @name navEditorApp.areas
 * @description
 * # areas
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('AreaService', function($http, _) {

    var _mixinArea = function(area) {
      return angular.extend(area, {
        __AreaId__: area.Id,
      });
    };

    var _mixinGroup = function(group, area) {
      return angular.extend(group, {
        __AreaId__: area.Id,
        __GroupId__: group.Id,
      });
    };

    var _mixinSubArea = function(subArea, group) {
      return angular.extend(subArea, {
        __AreaId__: group.__AreaId__,
        __GroupId__: group.Id,
        __SubAreaId__: subArea.Id
      });
    };

    var _transformResponse = function(data, headersGetter, status) {
        var ret = {};
        var res = JSON.parse(data);
        ret.Indexes = {};
        ret.Indexes.Areas = {};
        ret.Indexes.Groups = {};
        ret.Indexes.SubAreas = {};

        //TODO what to do if dublicate ID is received?
        ret.Areas = _.map(res.Areas, function(area) {
          return (ret.Indexes.Areas[area.Id] = angular.extend(_mixinArea(area), {
            Groups: _.map(area.Groups, function(group) {
              return (ret.Indexes.Groups[group.Id] = angular.extend(_mixinGroup(group, area), {
                SubAreas: _.map(group.SubAreas, function(subArea) {
                  return (ret.Indexes.SubAreas[subArea.Id] = _mixinSubArea(subArea, group));
                })
              }));
            })
          }));
        });
        return ret;
      };

    var _areas, _indexes;

    var _def = $http({
      method: 'GET',
      url: '/api/areas/',
      transformResponse: _transformResponse
    });


    var _getGroups = function(areaId) {
      var area = _.findWhere(_areas, {__AreaId__: areaId});
      return area.Groups || (area.Groups = []);
    };

    var _getSubAreas = function(areaId, groupId) {
      var group = _.findWhere(_getGroups(areaId), {__GroupId__: groupId});
      return group.SubAreas || (group.SubAreas = []);
    };

    var _isItAnArea = function(entity) {
      return _.has(entity, '__AreaId__') &&
            !_.has(entity, '__GroupId__') &&
            !_.has(entity, '__SubAreaId__');
    };

    var _isItAGroup = function(entity) {
      return _.has(entity, '__AreaId__') &&
            _.has(entity, '__GroupId__') &&
            !_.has(entity, '__SubAreaId__');
    };

    var _isItASubArea = function(entity) {
      return _.has(entity, '__AreaId__') &&
            _.has(entity, '__GroupId__') &&
            _.has(entity, '__SubAreaId__');
    };

    // Public API here
    return {
      // for the sake of testing (
      _transformResponse: _transformResponse,
      loadAreas: function() {
        return _def.then(function(response) {
          _indexes = response.data.Indexes;
          return (_areas = response.data.Areas);
        });
      },
      getAreas: function() {
        return _areas;
      },
      getArea: function(id) {
        return _indexes.Areas[id];
      },
      addArea: function(_area) {
        var area = _mixinArea(_area);
        _areas.push(area);
        _indexes.Areas[area.Id] = area;
      },
      updateArea: function(area, newArea) {
        _areas[_.indexOf(_areas, area)] = newArea;
        delete _indexes.Areas[area.Id];
        _indexes.Areas[newArea.Id] = newArea;
      },
      removeArea: function(area) {
        _areas.splice(_.indexOf(_areas, area), 1);
        delete _indexes.Areas[area.Id];
        _.each(_.where(_.values(_indexes.Groups), {__AreaId__: area.Id}), function(group) {
          _.each(_.where(_.values(_indexes.SubAreas), {__AreaId__: area.Id, __GroupId__: group.Id}), function(subArea) {
            delete _indexes.SubAreas[subArea.Id];
          });
          delete _indexes.Groups[group.Id];
        });
      },
      reorderArea: function(index, area) {
        if (_isItAnArea(area)) {
          _areas.splice(_.indexOf(_areas, area), 1);
          _areas.splice(index, 0, area);
        }
      },

      // GROUPS
      getGroups: function(areaId) {
        return _getGroups(areaId);
      },
      getGroup: function(id) {
        return _indexes.Groups[id];
      },
      addGroup: function(area, _group) {
        var group = _mixinGroup(_group, area);
        _getGroups(area.Id).push(group);
        _indexes.Groups[group.Id] = group;
      },
      updateGroup: function(group, newGroup) {
        var groups = _getGroups(group.__AreaId__);
        groups[_.indexOf(groups, group)] = newGroup;
        delete _indexes.Groups[group.Id];
        _indexes.Groups[newGroup.Id] = newGroup;
      },
      removeGroup: function(group) {
        var groups = _getGroups(group.__AreaId__);
        groups.splice(_.indexOf(groups, group), 1);
        delete _indexes.Groups[group.Id];
        _.each(_.where(_.values(_indexes.SubAreas), {__AreaId__: group.__AreaId__, __GroupId__: group.Id}), function(subArea) {
          delete _indexes.SubAreas[subArea.Id];
        });
      },
      reorderGroup: function(index, group) {
        if (_isItAGroup(group)) {
          var groups = _getGroups(group.__AreaId__);
          groups.splice(_.indexOf(groups, group), 1);
          groups.splice(index, 0, group);
        }
      },

      // SUB AREAS
      getSubAreas: function(areaId, groupId) {
        return _getSubAreas(areaId, groupId);
      },
      addSubArea: function(group, _subArea) {
        var subArea = _mixinSubArea(_subArea, group);
        var subAreas = _getSubAreas(group.__AreaId__, group.__GroupId__);
        subAreas.push(subArea);
        _indexes.SubAreas[subArea.Id] = subArea;
      },
      updateSubArea: function(subArea, newSubArea) {
        var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
        subAreas[_.indexOf(subAreas, subArea)] = newSubArea;
        delete _indexes.SubAreas[subArea.Id];
        _indexes.SubAreas[newSubArea.Id] = newSubArea;
      },
      removeSubArea: function(subArea) {
        var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
        subAreas.splice(_.indexOf(subAreas, subArea.data), 1);
        delete _indexes.SubAreas[subArea.Id];
      },
      reorderSubArea: function(index, subArea) {
        if (_isItASubArea(subArea)) {
          var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
          subAreas.splice(_.indexOf(subAreas, subArea), 1);
          subAreas.splice(index, 0, subArea);
        }
      },

      save: function() {
        _def.then(function(response) {
          $http.post('/api/areas', response.data);
        });
      }
    };
  });
