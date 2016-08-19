/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Grab environment variables and prepare them to be injected into the
// application via DefinePlugin in Webpack configuration.

var NODE_ENV = process.env.NODE_ENV || 'development';

// Add variables defined in application env.json
const appEnv = require(require('./paths').appEnv)[NODE_ENV];

Object.keys(appEnv).forEach((key) => {
  process.env[key] = appEnv[key];
});

module.exports = Object
  .keys(process.env)
  .reduce((env, key) => {
    env['process.env.' + key] = JSON.stringify(process.env[key]);
    return env;
  }, {
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  });
