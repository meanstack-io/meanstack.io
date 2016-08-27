/**
 * Bootstrap application.
 *
 */

'use strict';

/**
 * Module dependencies.
 */
var meanstack = require('meanstack'),
    path = require('path');

/**
 * bootstrap
 *
 * @param callback
 */
function bootstrap(callback) {

    // Set directory of configuration.
    meanstack.bindConfigPath(
        path.resolve(__dirname, '../config')
    );

    meanstack.bootstrap(callback);
}

module.exports = bootstrap;
