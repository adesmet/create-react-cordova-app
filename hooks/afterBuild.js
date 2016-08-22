var fs = require('fs');
var paths = require('../config/paths');
var config = require(paths.appPackageJson);

var buildTypes = {
  DEBUG: 'debug',
  RELEASE: 'release',
};

var apkFilePaths = [
  paths.appPlatforms + '/android/build/outputs/apk/android-release-unsigned.apk',
  paths.appPlatforms + '/android/build/outputs/apk/android-debug.apk',
];

function formatFileName(buildType, version) {
  return config.name + '_' + buildType + '_' + version.replace(/\./g, '-') + '.apk';
}

module.exports = function(context) {
  var buildType = buildTypes.DEBUG;

  if (context.opts.options.release) {
    buildType = buildTypes.RELEASE;
  }

  if (!fs.existsSync(paths.appDist)) {
    fs.mkdirSync(paths.appDist);
  }

  apkFilePaths.forEach(function(filePath) {
    if (fs.existsSync(filePath)) {
      fs.rename(filePath, paths.appDist + '/' + formatFileName(buildType, config.version));
    }
  });
}
