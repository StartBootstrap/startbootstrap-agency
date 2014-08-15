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
                    'dist/fonts/glyphicons-halflings-regular.eot': ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot'],
                    'dist/fonts/glyphicons-halflings-regular.svg': ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg'],
                    'dist/fonts/glyphicons-halflings-regular.ttf': ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf'],
                    'dist/fonts/glyphicons-halflings-regular.woff': ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff'],
                }
            },
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'js/*.js'],
                dest: 'dist/',
            },
        },
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            production: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ['*.html', 'mail/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'copy', 'less', 'imagemin']);
    grunt.registerTask('build-css', ['less']);


};
