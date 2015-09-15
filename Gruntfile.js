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
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'js/plugins/*.js',
					          'bower_components/wow/dist/wow.js',
					          'bower_components/purl/purl.js',
                    'bower_components/bootstrap-magnify/js/bootstrap-magnify.js',
                    'bower_components/jquery.lazyload/js/jquery.lazyload.js',
                    'js/custom-cookies.js',
                    'js/custom.js'
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
                src: ['*.html','mail/**', 'img/**', 'less/**'],
                dest: 'dist/',
            },
            favicon: {
                expand: true,
                src: '*',
                cwd: 'favicon/',
                dest: 'dist/'
            },
            glyphicons: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'fonts/glyphicons-halflings-regular.*'
                    ],
                    dest: 'dist/'
                }, ]
            },
            fontawesomefonts: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/fontawesome/fonts/',
                    src: [
                        '*.*'
                    ],
                    dest: 'dist/fonts/'
                }, ]
              },
              fontawesomecss: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/fontawesome/css',
                    src: [
                        'font-awesome.min.css'
                    ],
                    dest: 'dist/css/'
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
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap.min.css'                    ],
                    dest: 'dist/'
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
            }
        },
        cssmin: {
        	  options: {
        	    shorthandCompacting: false,
        	    roundingPrecision: -1
        	  },
        	  target: {
              files: {
              'dist/css/custom.min.css': ['dist/css/*.css']
              }
        	  }
        	},
        htmlmin: {
            dist: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              expand: true,
              cwd: 'dist',
              src: ['*.html'],
              dest: 'dist/'
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
            htmlmin: {
                files: ['dist/*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            cssmin: {
                files: ['dist/css/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        xml_sitemap: {
          default_options: {
            options: {
              /*changefreq: 'weekly',*/
              dest: 'dist/'
            },
            files: [
              {
                src: ['*.html']
              }
            ]
          }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-xml-sitemap');

    // Default task(s).
    grunt.registerTask('default', ['clean','concat', 'uglify', 'copy', 'less','cssmin', 'htmlmin','xml_sitemap','connect','watch']);

};
