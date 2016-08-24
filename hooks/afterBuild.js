var moveAndRenameAPK = require('./afterBuild/moveAndRenameAPK');
var signAndAlignAPK = require('./afterBuild/signAndAlignAPK');

module.exports = function(context) {
  moveAndRenameAPK(context);
  signAndAlignAPK(context);
}
