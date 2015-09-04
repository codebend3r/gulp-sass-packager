'use strict';

var should = require('chai').should(),
  expect = require('chai').expect,
  assert = require('chai').assert,
  through = require('through2'),
  path = require('path'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  sassPackager = require('../index');

describe('sass packager', function () {

  var getFile = function (filePath) {
    return new gutil.File({
      path: filePath,
      cwd: __dirname,
      base: path.dirname(filePath),
      contents: fs.readFileSync(filePath)
    });
  };

  it('should be defined', function () {

    assert.isDefined(sassPackager, 'sassPackager defined');

  });

  it('should add import scss command without brand', function (cb) {

    var stream = sassPackager({
      packageJSON: './test/fixtures/in/sass-config.json'
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');

      assert.include(changedFile, '@import "module1/module1"');
      assert.include(changedFile, '@import "module2/module2"');
      assert.include(changedFile, '@import "anotherModule/anotherModule"');

      assert.notInclude(changedFile, '@import "brand/testbrand/core/core"');
      assert.notInclude(changedFile, '@import "brand/testbrand/module1/module1"');
      assert.notInclude(changedFile, '@import "brand/testbrand/module2/module2"');
      assert.notInclude(changedFile, '@import "brand/testbrand/anotherModule/anotherModule"');

      cb();

    });

    stream.write(getFile('./test/fixtures/in/file.scss'));

  });

  it('should add import scss command with brand', function (cb) {

    var stream = sassPackager({
      packageJSON: './test/fixtures/in/sass-config-with-brand.json'
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');

      assert.include(changedFile, '@import "module1/module1"');
      assert.include(changedFile, '@import "module2/module2"');
      assert.include(changedFile, '@import "anotherModule/anotherModule"');

      assert.include(changedFile, '@import "brand/testbrand/core/core"');
      assert.include(changedFile, '@import "brand/testbrand/module1/module1"');
      assert.include(changedFile, '@import "brand/testbrand/module2/module2"');
      assert.include(changedFile, '@import "brand/testbrand/anotherModule/anotherModule"');

      cb();

    });

    stream.write(getFile('./test/fixtures/in/file.scss'));

  });

});
