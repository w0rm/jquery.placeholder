module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js'
      , dest: 'dest/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['src/*.js']
    , options: {
        jshintrc: '.jshintrc'
      }
    },
    mocha_phantomjs: {
      all: ['spec/**/*.html']
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'mocha_phantomjs']);


  // Travis CI task.
  grunt.registerTask('travis', ['lint']);


};
