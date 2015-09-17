/**
 * Updated by crivas on 09/17/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: gulp-sass-packager
 */

'use strict';

var jsonfile = require('jsonfile'),
  fs = require('fs'),
  _ = require('underscore-node'),
  sassPackager = require('./lib/sassPackager'),
  through = require('through2'),
  gutil = require('gulp-util');

/**
 * dynamically imports sass files based on folder names
 */
var gulpSassPackager = function (options) {

  var packagesJSON;

  if (!_.isUndefined(options.packageJSON)) {
    if (typeof options.packageJSON === 'string') {
      packagesJSON = jsonfile.readFileSync(options.packageJSON);
    } else if (typeof options.packageJSON === 'object') {
      packagesJSON = options.packageJSON;
    }
  } else {
    packagesJSON = './config.json';
  }


  /**
   * buffer each content
   * @param file
   * @param enc
   * @param callback
   */
  var bufferedContents = function (file, enc, callback) {

    if (file.isStream()) {

      this.emit('error', new gutil.PluginError('sassImportInjector', 'Streams are not supported!'));
      callback();

    } else if (file.isNull()) {

      callback(null, file); // Do nothing if no contents

    } else {

      var ctx = file.contents.toString('utf8'),
        sassAfterImports = sassPackager(ctx, packagesJSON);

      file.contents = new Buffer(sassAfterImports);
      callback(null, file);

    }

  };

  /**
   * returns streamed content
   */
  return through.obj(bufferedContents);

};

module.exports = gulpSassPackager;
