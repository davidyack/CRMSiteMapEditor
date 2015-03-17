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

    var def = $http.get('/api/areas/');

    // Public API here
    return {
      getAreas: function() {
        return def.then(function(response) {
          return response.data.Areas;
        });
      },
      addArea: function(area) {
        return def.then(function(response) {
          response.data.Areas.push(area);
        });
      },
      updateArea: function(oldArea, newArea) {
        return def.then(function(response) {
          response.data.Areas[_.indexOf(response.data.Areas, oldArea)] = newArea;
        });
      },
      removeArea: function(area) {
        return def.then(function(response) {
          response.data.Areas.splice(_.indexOf(response.data.Areas, area), 1);
        });
      },

      // GROUPS
      getGroups: function(areaId) {
        return def.then(function(response) {
          var area = _.findWhere(response.data.Areas, {Id: areaId});
          return area.Groups || (area.Groups = []);
        });
      },
      addGroup: function(areaId, group) {
        def.then(function(response) {
          _.findWhere(response.data.Areas, {Id: areaId}).Groups.push(group);
        });
      },
      updateGroup: function(areaId, oldGroup, newGroup) {
        return def.then(function(response) {
          var groups = _.findWhere(response.data.Areas, {Id: areaId}).Groups;
          groups[_.indexOf(groups, oldGroup)] = newGroup;
        });
      },
      removeGroup: function(areaId, group) {
        return def.then(function(response) {
          var groups = _.findWhere(response.data.Areas, {Id: areaId}).Groups;
          groups.splice(_.indexOf(groups, group), 1);
        });
      },

      // SUB AREAS
      getSubAreas: function(areaId, groupId) {
        return def.then(function(response) {
          var group = _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId});
          return group.SubAreas || (group.SubAreas = []);
        });
      },
      addSubArea: function(areaId, groupId, subArea) {
        return def.then(function(response) {
          _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId}).SubAreas.push(subArea);
        });
      },
      updateSubArea: function(areaId, groupId, oldSubArea, newSubArea) {
        return def.then(function(response) {
          var subAreas = _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId}).SubAreas;
          subAreas[_.indexOf(subAreas, oldSubArea)] = newSubArea;
        });
      },
      removeSubArea: function(areaId, groupId, subArea) {
        return def.then(function(response) {
          var subAreas = _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId}).SubAreas;
          subAreas.splice(_.indexOf(subAreas, subArea), 1);
        });
      },


      save: function() {
        def.then(function(response) {
          $http.post('/api/areas', response.data);
        });
      }
    };
  });
