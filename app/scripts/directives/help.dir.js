'use strict';

require('angular');
require('angular-ui-router');

angular.module('navEditorApp')
  .config(function($stateProvider) {
    $stateProvider.state('help', {
      views: {
        'main': {
          templateUrl: 'views/help.view.html',
        }
      },
      url: '/help'
    });
  });

angular.module('navEditorApp')
  .controller('VideoController',
    function($sce) {
      this.config = {
        sources: [{
          src: $sce.trustAsResourceUrl('https://labdone.blob.core.windows.net/downloads/11a92b4f-a7d9-e411-80fa-ac162db45c56'),
          type: 'video/mp4'
        }],
        theme: 'styles/videogular.css'
      };
    }
  );

