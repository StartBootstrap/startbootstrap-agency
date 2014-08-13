module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            jquery: {
                files: {
                    'dist/js/jquery.min.js': ['bower_components/jquery/dist/jquery.min.js'],
                    'dist/js/jquery.js': ['bower_components/jquery/dist/jquery.js']
                }
            },
            bootstrap: {
                files: {
                    'dist/js/bootstrap.min.js': ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
                    'dist/js/bootstrap.js': ['bower_components/bootstrap/dist/js/bootstrap.js'],
                    'dist/css/bootstrap.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
                    'dist/css/bootstrap.css': ['bower_components/bootstrap/dist/css/bootstrap.css'],
                }
            },
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**'],
                dest: 'dist/',
            },
        },
    });

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'copy']);

};
