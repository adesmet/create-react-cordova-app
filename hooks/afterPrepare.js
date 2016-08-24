var replaceEnv = require('./afterPrepare/replaceEnv');

module.exports = function(context) {
  replaceEnv(context);
}
