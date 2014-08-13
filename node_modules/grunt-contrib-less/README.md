# grunt-contrib-less v0.11.4 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-less.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-less) <a href="https://ci.appveyor.com/project/gruntjs/grunt-contrib-less"><img src="https://ci.appveyor.com/api/projects/status/e3aa4d07xe4w4u05/branch/master" alt="Build Status: Windows" height="18" /></a>

> Compile LESS files to CSS.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-less --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-less');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-less/tree/grunt-0.3-stable).*


## Less task
_Run this task with the `grunt less` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### paths
Type: `String` `Array` `Function`

Default: Directory of input file.

Specifies directories to scan for @import directives when parsing. Default value is the directory of the source, which is probably what you want.

If you specify a function the source filepath will be the first argument. You can return either a string or an array of paths to be used.

#### rootpath
Type: `String`

Default: `""`

A path to add on to the start of every url resource.

#### compress
Type: `Boolean`

Default: `false`

Compress output by removing some whitespaces.

#### cleancss
Type: `Boolean`

Default: `false`

Compress output using [clean-css](https://npmjs.org/package/clean-css).

#### ieCompat
Type: `Boolean`

Default: `true`

Enforce the css output is compatible with Internet Explorer 8.

For example, the [data-uri](https://github.com/cloudhead/less.js/pull/1086) function encodes a file in base64 encoding and embeds it into the generated CSS files as a data-URI. Because Internet Explorer 8 limits `data-uri`s to 32KB, the [ieCompat](https://github.com/cloudhead/less.js/pull/1190) option prevents `less` from exceeding this.

#### optimization
Type: `Integer`

Default: `null`

Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.

#### strictImports
Type: `Boolean`

Default: `false`

Force evaluation of imports.

#### strictMath
Type: `Boolean`

Default: `false`

When enabled, math is required to be in parenthesis.

#### strictUnits
Type: `Boolean`

Default: `false`

When enabled, less will validate the units used (e.g. 4px/2px = 2, not 2px and 4em/2px throws an error).

#### syncImport
Type: `Boolean`

Default: `false`

Read @import'ed files synchronously from disk.

#### dumpLineNumbers
Type: `String`

Default: `false`

Configures -sass-debug-info support.

Accepts following values: `comments`, `mediaquery`, `all`.

#### relativeUrls
Type: `Boolean`

Default: `false`

Rewrite urls to be relative. false: do not modify urls.

#### customFunctions
Type: `Object`

Default: none

Define custom functions to be available within your LESS stylesheets. The function's name must be lowercase.
In the definition, the first argument is the less object, and subsequent arguments are from the less function call.
Values passed to the function are types defined within less, the return value may be either one of them or primitive.
See the LESS documentation for more information on the available types.

#### report
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Either report only minification result or report minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

#### sourceMap
Type: `Boolean`

Default: `false`

Enable source maps.

#### sourceMapFilename
Type: `String`

Default: none

Write the source map to a separate file with the given filename.

#### sourceMapURL
Type: `String`

Default: none

Override the default url that points to the sourcemap from the compiled css file.

#### sourceMapBasepath
Type: `String`

Default: none

Sets the base path for the less file paths in the source map.

#### sourceMapRootpath
Type: `String`

Default: none

Adds this path onto the less file paths in the source map.

#### outputSourceFiles
Type: `Boolean`

Default: false

Puts the less files into the map instead of referencing them.

#### modifyVars
Type: `Object`

Default: none

Overrides global variables. Equivalent to ```--modify-vars='VAR=VALUE'``` option in less.

#### banner
Type: `String`

Default: none

### Usage Examples

```js
less: {
  development: {
    options: {
      paths: ["assets/css"]
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  },
  production: {
    options: {
      paths: ["assets/css"],
      cleancss: true,
      modifyVars: {
        imgPath: '"http://mycdn.com/path/to/images"',
        bgColor: 'red'
      }
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  }
}
```


## Release History

 * ----------   v0.11.4   Fix 'banner', 'urlArgs' LESS options Fixes npm 2 peerDependencies issues
 * 2014-06-20   v0.11.3   Update to Less ~1.7.2.
 * 2014-06-01   v0.11.2   Lock to less 1.7.0.
 * 2014-05-26   v0.11.1   Fix `modifyVars` to work when less file ends with a comment.
 * 2014-03-19   v0.11.0   Custom functions can return types defined by less paths option now accepts a function Replaced deprecated grunt.util methods Removes deprecated grunt.lib.contrib
 * 2014-03-01   v0.10.0   sourceMapBasepath accepts a function. Update copyright to 2014. Update .gitattributes. Update less.js to v1.7.0. Prevent CRLF in the repo. Adds modify-vars option. Changed to async stack call. Fixes data-uri test. Normalize line endings on tests.
 * 2014-01-07   v0.9.0   Bump to less 1.6
 * 2013-12-06   v0.8.3   Support sourceMapURL
 * 2013-11-14   v0.8.2   Support outputSourceFiles
 * 2013-10-24   v0.8.1   Support sourceMapFilename, sourceMapBasepath and sourceMapRootpath
 * 2013-10-22   v0.8.0   Upgrade to LESS 1.5 Support strictUnits option Support sourceMap option Add customFunctions option for defining custom functions within LESS Output the source file name on error yuicompress option now cleancss (Less changed underlying dependency)
 * 2013-08-08   v0.7.0   Downgrade no source files warning to only in verbose mode
 * 2013-08-08   v0.6.5   Support strictMath option Support rootpath parse option
 * 2013-07-09   v0.6.4   Support relativeUrls option
 * 2013-07-06   v0.6.3   Add report option for minification and gzip results
 * 2013-07-03   v0.6.2   support syncImport
 * 2013-06-12   v0.6.1   Support ieCompat
 * 2013-06-09   v0.6.0   Bump less to 1.4.0
 * 2013-05-23   v0.5.2   Improve error handling.
 * 2013-04-25   v0.5.1   Gracefully handle configuration without sources.
 * 2013-02-15   v0.5.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.5.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions. Remove experimental wildcard destination support. Switching to this.files api.
 * 2012-10-18   v0.3.2   Add support for dumpLineNumbers.
 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   Global options depreciated Revert normalize linefeeds.
 * 2012-09-16   v0.2.2   Support all less options Normalize linefeeds Default path to dirname of src file.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tyler Kellen](http://goingslowly.com/)

*This file was generated on Tue Jul 29 2014 14:43:30.*
