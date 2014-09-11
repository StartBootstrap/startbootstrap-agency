module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            main: {
                src: [
                    'js/plugins/*.js',
                    'js/<%= pkg.slug %>.js'
                ],
                dest: 'dist/js/<%= pkg.slug %>.js',
            }
        },
        uglify: {
            main: {
                src: 'dist/js/<%= pkg.slug %>.js',
                dest: 'dist/js/<%= pkg.slug %>.min.js'
            }
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'img/**'],
                dest: 'dist/',
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: [
                        'jquery.min.js',
                        'jquery.js',
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'js/bootstrap.js',
                        'js/bootstrap.min.js',
                        'css/bootstrap.css',
                        'css/bootstrap.min.css'
                    ],
                    dest: 'dist/'
                }, ]
            },
            glyphicons: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/',
                    src: [
                        'fonts/glyphicons-halflings-regular.eot',
                        'fonts/glyphicons-halflings-regular.svg',
                        'fonts/glyphicons-halflings-regular.ttf',
                        'fonts/glyphicons-halflings-regular.woff',
                    ],
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
                    "dist/css/<%= pkg.slug %>.css": "less/<%= pkg.slug %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/<%= pkg.slug %>.min.css": "less/<%= pkg.slug %>.less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['dist/css/<%= pkg.slug %>.css', 'dist/css/<%= pkg.slug %>.min.css', 'dist/js/<%= pkg.slug %>.js', 'dist/js/<%= pkg.slug %>.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js', 'js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            copy: {
                files: ['*.html', 'mail/**', 'img/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'less', 'usebanner']);

};
