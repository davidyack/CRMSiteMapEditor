'use strict';

require('angular');

angular
  .module('navEditorApp')
  .store('SettingsStore', function(flux) {
    var state = flux.immutable({
      reorderingMode: false
    });
    return {
      handlers: {
        'changeReorderingMode': 'changeReorderingMode'
      },
      changeReorderingMode: function() {
        state = state.set('reorderingMode', !state.reorderingMode);
        this.emit('reorderingModeChanged');
      },
      exports: {
        get reorderingMode() {
          return state.reorderingMode;
        }
      }
    };
  });

