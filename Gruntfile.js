// Generated on 2015-03-16 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  var externals = ['angular', 'underscore','angular-bootstrap',
    'angular-szn-autocomplete', 'angular-ui-router', 'ngDraggable', 'angular-loading-bar', 'angular-animate'];

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'browserify:app', 'concat'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/*.css'],
        tasks: ['concat_css']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      views: {
        files: ['<%= yeoman.app %>/views/*.html'],
        tasks: ['html2js', 'concat']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    html2js: {
      options: {
        base: 'app'
      },
      main: {
        src: ['<%= yeoman.app %>/views/*.html'],
        dest: '.tmp/templates.js'
      },
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          // open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('node_modules'),
              require('./api'),
              connect.static(appConfig.app),
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        ignores: ['**/videogular.js', '**/vg-controls.js'],
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    browserify: {
      vendor: {
        src: [],
        dest: '.tmp/vendor.js',
        options: {
          require: externals,
        }
      },
      app: {
        src: ['<%= yeoman.app %>/scripts/{,*/}*.js', '.tmp/templates.js'],
        dest: '.tmp/app.js',
        options: {
          external: externals,
        }
      }
    },
    concat: {
      '.tmp/crmsitemapeditor.js': ['.tmp/vendor.js',
            '.tmp/app.js']
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist'
          ]
        }]
      },
      server: '.tmp'
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '*.js',
          dest: '.tmp'
        }]
      }
    },


    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: '.tmp', src: ['crmsitemapeditor.js'], dest: '<%= yeoman.dist %>/'},
          {expand: true, cwd: '<%= yeoman.app %>', src: ['images/*'], dest: '<%= yeoman.dist %>/'}
        ],
      },
    },

    uglify: {
      dist: {
        files: {
          '.tmp/crmsitemapeditor.js': ['.tmp/crmsitemapeditor.js']
        }
      }
    },
    concat_css: {
      options: {
          // Task-specific options go here.
      },
      all: {
          src: ['node_modules/angular-loading-bar/build/loading-bar.css', '<%= yeoman.app %>/styles/app.css'],
          dest: '.tmp/crmsitemapeditor.css'
      },
    },
    cssmin: {
      options: {
      },
      target: {
        files: {
          '<%= yeoman.dist %>/crmsitemapeditor.css': ['.tmp/crmsitemapeditor.css']
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concat_css',
      'html2js',
      'browserify',
      'ngAnnotate',
      'concat',
      // 'uglify',
      // 'cssmin',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('test', [
    'clean:server',
    'html2js',
    'browserify',
    'concat',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:server',
    'concat_css',
    'html2js',
    'browserify',
    'ngAnnotate',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('dist', [
    'clean:dist', 'build', 'copy:dist'
  ]);
};

