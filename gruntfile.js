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
      , dest: 'dest/<%= pkg.name %>.min.js'
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
  })

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-mocha-phantomjs')
  grunt.loadNpmTasks('grunt-bower-task')

  // Register tasks
  grunt.registerTask('default', ['bower:install', 'jshint', 'uglify', 'mocha_phantomjs'])
  grunt.registerTask('test', ['jshint', 'mocha_phantomjs'])
  grunt.registerTask('travis', ['bower:install', 'jshint', 'mocha_phantomjs'])

};
