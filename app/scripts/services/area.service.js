'use strict';

require('angular');
/**
 * @ngdoc service
 * @name navEditorApp.areas
 * @description
 * # areas
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('AreaService', function($http, _, $window) {

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

    var _areas, _indexes = {};
    var _transformResponse = function(data, headersGetter, status) {
      var res = JSON.parse(data);

      _indexes.PKAreas = {};
      _indexes.PKGroups = {};
      _indexes.PKSubAreas = {};

      //TODO what to do if dublicate ID is received?
      return (_areas = _.map(res.Areas, function(area) {
        return (_indexes.PKAreas[area.Id] = angular.extend(_mixinArea(area), {
          Groups: _.map(area.Groups, function(group) {
            return (_indexes.PKGroups[group.Id] = angular.extend(_mixinGroup(group, area), {
              SubAreas: _.map(group.SubAreas, function(subArea) {
                return (_indexes.PKSubAreas[subArea.Id] = _mixinSubArea(subArea, group));
              })
            }));
          })
        }));
      }));
    };

    var _transformRequest = function(data, headersGetter, status) {
      var exclude = ['__AreaId__', '__GroupId__', '__SubAreaId__'];
      return JSON.stringify({
        Areas: _.map(_areas, function(_area) {
          var area = _.extend({}, _area);
          if (area.Groups.length === 0) {
            delete area.Groups;
          } else {
            area.Groups = _.map(area.Groups, function(_group) {
              var group = _.extend({}, _group);
              if (group.SubAreas.length === 0) {
                delete group.SubAreas;
              } else {
                group.SubAreas = _.map(group.SubAreas, function(_subArea) {
                  var subArea = _.extend({}, _subArea);
                  return _.omit(subArea, exclude);
                });
              }
              return _.omit(group, exclude);
            });
          }
          return _.omit(area, exclude);
        })
      });
    };

    var _def = $http({
      method: 'GET',
      url: $window.CRMSiteMapEditorSiteMapServiceURL || '/api/areas/',
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
      // for the sake of testing
      _transformResponse: _transformResponse,
      _transformRequest: _transformRequest,
      _indexes: _indexes,
      // for the sake of testing

      loadAreas: function() {
        return _def.then(function(response) {
          return response.data.Areas;
        });
      },
      getAreas: function() {
        return _areas;
      },
      getArea: function(id) {
        return _indexes.PKAreas[id];
      },
      addArea: function(_area) {
        var area = _mixinArea(_area);
        _areas.push(area);
        _indexes.PKAreas[area.Id] = area;
      },
      updateArea: function(area, _newArea) {
        var newArea = _mixinArea(_newArea);
        _areas[_.indexOf(_areas, area)] = newArea;
        delete _indexes.PKAreas[area.Id];
        _indexes.PKAreas[newArea.Id] = newArea;
      },
      removeArea: function(area) {
        _areas.splice(_.indexOf(_areas, area), 1);
        delete _indexes.PKAreas[area.Id];
        _.each(_.where(_.values(_indexes.PKGroups), {__AreaId__: area.Id}), function(group) {
          _.each(_.where(_.values(_indexes.PKSubAreas), {__AreaId__: area.Id, __GroupId__: group.Id}), function(subArea) {
            delete _indexes.PKSubAreas[subArea.Id];
          });
          delete _indexes.PKGroups[group.Id];
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
        return _indexes.PKGroups[id];
      },
      addGroup: function(area, _group) {
        var group = _mixinGroup(_group, area);
        _getGroups(area.Id).push(group);
        _indexes.PKGroups[group.Id] = group;
      },
      updateGroup: function(group, _newGroup) {
        var newGroup = _mixinGroup(_newGroup, group);
        var groups = _getGroups(group.__AreaId__);
        groups[_.indexOf(groups, group)] = newGroup;
        delete _indexes.PKGroups[group.Id];
        _indexes.PKGroups[newGroup.Id] = newGroup;
      },
      removeGroup: function(group) {
        var groups = _getGroups(group.__AreaId__);
        groups.splice(_.indexOf(groups, group), 1);
        delete _indexes.PKGroups[group.Id];
        _.each(_.where(_.values(_indexes.PKSubAreas), {__AreaId__: group.__AreaId__, __GroupId__: group.Id}), function(subArea) {
          delete _indexes.PKSubAreas[subArea.Id];
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
        _indexes.PKSubAreas[subArea.Id] = subArea;
      },
      updateSubArea: function(subArea, _newSubArea) {
        var newSubArea = _mixinSubArea(_newSubArea, subArea);
        var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
        subAreas[_.indexOf(subAreas, subArea)] = newSubArea;
        delete _indexes.PKSubAreas[subArea.Id];
        _indexes.PKSubAreas[newSubArea.Id] = newSubArea;
      },
      removeSubArea: function(subArea) {
        var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
        subAreas.splice(_.indexOf(subAreas, subArea.data), 1);
        delete _indexes.PKSubAreas[subArea.Id];
      },
      reorderSubArea: function(index, subArea) {
        if (_isItASubArea(subArea)) {
          var subAreas =_getSubAreas(subArea.__AreaId__, subArea.__GroupId__);
          subAreas.splice(_.indexOf(subAreas, subArea), 1);
          subAreas.splice(index, 0, subArea);
        }
      },

      save: function() {
        $http({
          method: 'POST',
          url: $window.CRMSiteMapEditorSiteMapServiceURL || '/api/areas/',
          transformRequest: _transformRequest
        });
      },
      download: function() {
        return $http({
          method: 'POST',
          url: $window.CRMSiteMapEditorDownloadServiceURL || '/api/sitemapdownload',
          transformRequest: _transformRequest
        }).success(function(data, status, headers, config) {
          var userAgent = 'navigator' in $window && 'userAgent' in $window.navigator &&
            $window.navigator.userAgent.toLowerCase() || '';
          if (/msie/i.test(userAgent) || 'ActiveXObject' in window) {
            var blob1 = new Blob([data]);
            $window.navigator.msSaveBlob(blob1, 'download.xml');
          } else {
          var element = angular.element('<a/>');
            element.attr({
              href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
              target: '_blank',
              download: 'download.xml'
            })[0].click();
          }
        });
      }
    };
  });
