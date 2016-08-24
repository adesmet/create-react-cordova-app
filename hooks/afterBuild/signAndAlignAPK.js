var fs = require('fs');
var path = require('path');
var paths = require('../../config/paths');
var childProcess = require('child_process');

function signApkFile(keystorePath, keystoreAlias, fileName) {
  childProcess.execSync(
    `jarsigner                      \
      -verbose                      \
      -sigalg SHA1withRSA           \
      -digestalg SHA1               \
      -keystore ${keystorePath}     \
      ${paths.appDist}/${fileName}  \
      ${keystoreAlias}              \
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
          signApkFile(config.path, config.alias, apkFileName);
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
