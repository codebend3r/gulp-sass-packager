/**
 * Updated by crivas on 09/04/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: gulp-sass-packager
 */

'use strict';

var _ = require('underscore-node');

/**
 * adds import string to the sass files
 */
var sassPackager = function (sassFile, packagesJSON) {

	var newSass = sassFile;

	newSass += '\n';
	newSass += '// ute imports\n';

	_.each(packagesJSON.components, function (moduleName, key) {
		// if moduleName is defined (true)
		if (moduleName) {
			newSass += '@import "' + key + '/' + key + '";\n';
		}
	});

	if (packagesJSON.selectedBrand) {

		newSass += '\n';
		newSass += '// brand imports\n';
		newSass += '@import "brand/' + packagesJSON.selectedBrand.toLowerCase() + '/core/core";\n';

		_.each(packagesJSON.components, function (moduleName, key) {
			// if moduleName is defined (true)
			if (moduleName) {
				newSass += '@import "brand/' + packagesJSON.selectedBrand.toLowerCase() + '/' + key + '/' + key + '";\n';
			}
		});

	}

	return newSass;

};

module.exports = sassPackager;
