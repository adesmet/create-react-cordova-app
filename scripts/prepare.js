/**
 * Copyright (c) 2016-present, VRJ Software
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fs = require('fs');
var path = require('path');
var paths = require('./paths');

var buildTypes = {
  DEBUG: 'debug',
  RELEASE: 'release',
};

var buildType = buildTypes.DEBUG;

if (context.opts.options.release) {
  buildType = buildTypes.RELEASE;
}

var configFilePaths = [
  paths.androidPlatform + '/res/xml/config.xml'
];

module.exports = function(context) {
  var config = JSON.parse(fs.readFileSync(paths.appCordovaEnv, 'utf8'))[buildType];

  configFilePaths.forEach(function(filePath) {
    if (fs.existsSync(filePath)) {
      var data = fs.readFileSync(filePath, 'utf8');

      Object.keys(config).forEach(function(key) {
        data = data.replace(new RegExp(key), config[key]);
      });

      fs.writeFileSync(filePath, data, 'utf8');
    }
  });
}
