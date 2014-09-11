module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'js/**', 'img/**'],
                dest: 'dist/',
            },
            jquery: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: [
                            'jquery.min.js',
                            'jquery.js',
                        ],
                        dest: 'dist/js/'
                    },
                ]
            },
            bootstrap: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: [
                            'js/bootstrap.js',
                            'js/bootstrap.min.js',
                            'css/bootstrap.css',
                            'css/bootstrap.min.css'
                        ],
                        dest: 'dist/'
                    },
                ]
            },
            glyphicons: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/',
                        src: [
                            'fonts/glyphicons-halflings-regular.eot',
                            'fonts/glyphicons-halflings-regular.svg',
                            'fonts/glyphicons-halflings-regular.ttf',
                            'fonts/glyphicons-halflings-regular.woff',
                        ],
                        dest: 'dist/'
                    },
                ]
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
        watch: {
            scripts: {
                files: ['js/**'],
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'less']);
    grunt.registerTask('less-compile', ['less']);

};
