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
                    'js/<%= pkg.name %>.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'js/plugins/*.js',
					'bower_components/typed.js/js/typed.js',
					'bower_components/wow/dist/wow.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js',
            }
        },
        uglify: {
            main: {
                src: 'dist/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'img/**', 'less/**', 'portfolio/**'],
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
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
                }
            }
        },
        banner: '/* <%= pkg.title %> v<%= pkg.version %> */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['dist/css/<%= pkg.name %>.css', 'dist/css/<%= pkg.name %>.min.css', 'dist/js/<%= pkg.name %>.js', 'dist/js/<%= pkg.name %>.min.js']
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
                files: ['js/<%= pkg.name %>.js, js/plugins/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            copy: {
                files: ['*.html', 'img/**', 'less/**', 'portfolio/**', 'js/**'],
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
