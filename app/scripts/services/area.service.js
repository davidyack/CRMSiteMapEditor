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

    var _def = $http({
      method: 'GET',
      url: '/api/areas/',
      transformResponse: function(data, headersGetter, status) {
        var ret = {};
        var res = JSON.parse(data);
        ret.Indexes = {};

        ret.Areas = _.map(res.Areas, function(area) {
          return angular.extend(_mixinArea(area), {
            Groups: _.map(area.Groups, function(group) {
              return angular.extend(_mixinGroup(group, area), {
                SubAreas: _.map(group.SubAreas, function(subArea) {
                  return _mixinSubArea(subArea, group);
                })
              });
            })
          });
        });
        return ret;
      }
    });

    var _getGroups = function(areaId) {
      return _def.then(function(response) {
        var area = _.findWhere(response.data.Areas, {__AreaId__: areaId});
        return area.Groups || (area.Groups = []);
      });
    };

    var _getSubAreas = function(areaId, groupId) {
      return _getGroups(areaId).then(function(groups) {
        var group = _.findWhere(groups, {__GroupId__: groupId});
        return group.SubAreas || (group.SubAreas = []);
      });
    };


    // Public API here
    return {
      getAreas: function() {
        return _def.then(function(response) {
          return response.data.Areas;
        });
      },
      addArea: function(area) {
        return _def.then(function(response) {
          response.data.Areas.push(_mixinArea(area));
        });
      },
      updateArea: function(oldArea, newArea) {
        return _def.then(function(response) {
          response.data.Areas[_.indexOf(response.data.Areas, oldArea)] = newArea;
        });
      },
      removeArea: function(area) {
        return _def.then(function(response) {
          response.data.Areas.splice(_.indexOf(response.data.Areas, area), 1);
        });
      },

      // GROUPS
      getGroups: function(areaId) {
        return _getGroups(areaId);
      },
      addGroup: function(area, group) {
        _getGroups(area.Id).then(function(groups) {
          groups.push(_mixinGroup(group, area));
        });
      },
      updateGroup: function(group, newGroup) {
        _getGroups(group.__AreaId__).then(function(groups) {
          groups[_.indexOf(groups, group)] = newGroup;
        });
      },
      removeGroup: function(group) {
        _getGroups(group.__AreaId__).then(function(groups) {
          groups.splice(_.indexOf(groups, group), 1);
        });
      },

      // SUB AREAS
      getSubAreas: function(areaId, groupId) {
        return _getSubAreas(areaId, groupId).then(function(subAreas) {
          return subAreas;
        });
      },
      addSubArea: function(group, subArea) {
        _getSubAreas(group.__AreaId__, group.__GroupId__).then(function(subAreas) {
          subAreas.push(_mixinSubArea(subArea, group));
        });
      },
      updateSubArea: function(subArea, newSubArea) {
        _getSubAreas(subArea.__AreaId__, subArea.__GroupId__).then(function(subAreas) {
          subAreas[_.indexOf(subAreas, subArea)] = newSubArea;
        });
      },
      removeSubArea: function(subArea) {
        _getSubAreas(subArea.__AreaId__, subArea.__GroupId__).then(function(subAreas) {
          subAreas.splice(_.indexOf(subAreas, subArea.data), 1);
        });
      },

      save: function() {
        _def.then(function(response) {
          $http.post('/api/areas', response.data);
        });
      }
    };
  });
