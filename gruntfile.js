module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    , build: {
        src: 'src/<%= pkg.name %>.js'
      , dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  , jshint: {
      files: ['src/*.js', 'spec/*.js']
    , options: {
        jshintrc: '.jshintrc'
      }
    }
  , mocha_phantomjs: {
      all: ['spec/**/*.html']
    }
  , bower: {install: {}}
  , connect: {
      server: {
        options: {
          port: 8888
        , hostname: '*'
        , base: '.'
        }
      }
    }
  , clean: ['bower_components', "node_modules", "lib", "build"]
  })

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-mocha-phantomjs')
  grunt.loadNpmTasks('grunt-bower-task')

  // Register tasks
  grunt.registerTask('default', ['bower:install', 'jshint', 'uglify', 'mocha_phantomjs'])
  grunt.registerTask('test', ['jshint', 'mocha_phantomjs'])
  grunt.registerTask('travis', ['bower:install', 'jshint', 'mocha_phantomjs'])

  grunt.registerTask('server', ['connect:server:keepalive'])
};
