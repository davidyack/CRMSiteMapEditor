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

    var _def = $http({
      method: 'GET',
      url: '/api/areas/',
      transformResponse: function(data, headersGetter, status) {
        var ret = {};
        var res = JSON.parse(data);
        ret.Indexes = {};

        ret.Areas = _.map(res.Areas, function(area) {
          return angular.extend(area, {
            __AreaId__: area.Id,
            Groups: _.map(area.Groups, function(group) {
              return angular.extend(group, {
                __AreaId__: area.Id,
                __GroupId__: group.Id,
                SubAreas: _.map(group.SubAreas, function(subArea) {
                  return angular.extend(subArea, {
                    __SubAreaId__: subArea.Id,
                    __AreaId__: area.Id,
                    __GroupId__: group.Id
                  });
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
          response.data.Areas.push(area);
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
      addGroup: function(areaId, group) {
        _getGroups(areaId).then(function(groups) {
          groups.push(group);
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
      addSubArea: function(subArea) {
        _getSubAreas(subArea).then(function(subAreas) {
          subAreas.push(subArea);
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
