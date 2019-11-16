'use strict';

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* \n'+
		' * Leaflet GeoJSON Selector v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under the <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demo: \n'+
		' * <%= pkg.homepage %> \n'+
		' * \n'+
		' * Source: \n'+
		' * <%= pkg.repository.url %> \n'+
		' * \n'+
		' */\n'
	},
	clean: {
		dist: {
			src: ['dist/*']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignora tabs e space warning
			"-W033": true,
			"-W044": true	//ignore regexp
		},
		files: ['src/*.js']
	},
	concat: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-geojson-selector.src.js': ['src/leaflet-geojson-selector.js'],			
				'dist/leaflet-geojson-selector.src.css': ['src/leaflet-geojson-selector.css']
			}
		}
	},
	uglify: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-geojson-selector.min.js': ['dist/leaflet-geojson-selector.src.js']
			}
		}
	},
	cssmin: {
		combine: {
			files: {
				'dist/leaflet-geojson-selector.min.css': ['src/leaflet-geojson-selector.css']
			}
		},
		options: {
			banner: '<%= meta.banner %>'
		},
		minify: {
			expand: true,
			cwd: 'dist/',
			files: {
				'dist/leaflet-geojson-selector.min.css': ['src/leaflet-geojson-selector.css']
			}
		}
	}
});

grunt.registerTask('default', [
	'clean',
	'jshint',
	'concat',
	'uglify',
	'cssmin'
]);

};