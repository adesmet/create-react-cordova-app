var fs = require('fs');
var path = require('path');
var paths = require('../../config/paths');
var childProcess = require('child_process');

function signApkFile(path, alias, password, fileName) {
  childProcess.execSync(
    `jarsigner                      \
      -verbose                      \
      -sigalg SHA1withRSA           \
      -digestalg SHA1               \
      -keystore ${path}             \
      -storepass ${password}        \
      ${paths.appDist}/${fileName}  \
      ${alias}                      \
    `
  );
}

function alignApkFile(fileName) {
  var signedFileName = fileName.replace(/release/, 'release-signed');

  childProcess.execSync(
    `zipalign                             \
      -v 4                                \
      ${paths.appDist}/${fileName}        \
      ${paths.appDist}/${signedFileName}  \
    `
  );
}

module.exports = function(context) {
  if (fs.existsSync(paths.appKeystore)) {
    var config = JSON.parse(fs.readFileSync(paths.appKeystore));
    var apkFiles = fs.readdirSync(paths.appDist);

    apkFiles.forEach(function(apkFileName) {
      if (apkFileName.match(/release/)) {
        try {
          signApkFile(config.path, config.alias, config.password, apkFileName);
          alignApkFile(apkFileName);
        } catch(error) {
          console.error(error);
        }
      }
    });
  } else {
    console.warn('Could not sign and align APK. No keystore.json found.');
  }
}
