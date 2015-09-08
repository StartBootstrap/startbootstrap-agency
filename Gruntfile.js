module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean : {
        	dist: {
        	      src: ['dist/**']
        	    }
        },
        connect: {
            server: {
              options: {
                port: 9001,
                base: 'dist'
              }
            }
          },
        concat: {
            main: {
                src: [
                    'js/custom.js',
                    'js/custom-cookies.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'js/plugins/*.js',
					          'bower_components/wow/dist/wow.js',
					          'bower_components/purl/purl.js',
                    'bower_components/bootstrap-magnify/js/bootstrap-magnify.js'
                ],
                dest: 'dist/js/custom.js',
            }
        },
        uglify: {
            main: {
                src: 'dist/js/custom.js',
                dest: 'dist/js/custom.min.js'
            }
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'img/**', 'less/**'],
                dest: 'dist/',
            },
            favicon: {
                src: ['favicon/favicon.ico'],
                dest: 'dist/favicon.ico',
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: [
                        'jquery.min.js'
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap.min.css',
                        'js/bootstrap.min.js'
                    ],
                    dest: 'dist/'
                }, ]
            },
            glyphicons: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'fonts/glyphicons-halflings-regular.eot',
                        'fonts/glyphicons-halflings-regular.svg',
                        'fonts/glyphicons-halflings-regular.ttf',
                        'fonts/glyphicons-halflings-regular.woff',
                    ],
                    dest: 'dist/'
                }, ]
            },
            fontawesome: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/fontawesome/',
                    src: [
                        'fonts/*.*',
                        'css/font-awesome.min.css'
                    ],
                    dest: 'dist/font-awesome/'
                }, ]
            },
            animate: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/animate.css/',
                    src: [
                        'animate.min.css'
                    ],
                    dest: 'dist/css'
                }, ]
            },
            bootstrapmagnify: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap-magnify/css/',
                    src: [
                        'bootstrap-magnify.min.css'
                    ],
                    dest: 'dist/css'
                }, ]
            },
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/css/custom.css": "less/custom.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/custom.min.css": "less/custom.less"
                }
            }
        },
        cssmin: {
        	  options: {
        	    shorthandCompacting: false,
        	    roundingPrecision: -1
        	  },
        	  target: {
        	    files: {
        	      'dist/css/spinkit.min.css': 'bower_components/spinkit/css/spinners/7-three-bounce.css'
        	    }
        	  }
        	},
        watch: {
        	scripts: {
                files: ['js/**'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            copy: {
                files: ['*.html', 'img/**', 'less/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    // Default task(s).
    grunt.registerTask('default', ['clean','concat', 'uglify', 'copy', 'less','cssmin','connect','watch']);

};
