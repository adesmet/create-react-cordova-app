var fs = require('fs');
var path = require('path');
var paths = require('../../config/paths');

var buildTypes = {
  DEBUG: 'debug',
  RELEASE: 'release',
};

var configFilePaths = [
  paths.appPlatforms + '/android/res/xml/config.xml'
];

module.exports = function(context) {
  var buildType = buildTypes.DEBUG;

  if (context.opts.options.release) {
    buildType = buildTypes.RELEASE;
  }

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
