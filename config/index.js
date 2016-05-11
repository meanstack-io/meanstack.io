'use strict';

/**
 * Load configuration from the "process.env.NODE_ENV".
 * Example:
 *     process.env.NODE_ENV = 'production'
 *     config file = 'config-production.js'
 */
var path = require('path'),
    env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
    pathConfig = path.join(__dirname, 'config-' + env + '.js');

module.exports = require(pathConfig);
