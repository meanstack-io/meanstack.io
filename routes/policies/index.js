'use strict';

var routes = require('./routes'),
    auth = require('../../modules/auth');

/**
 * Config Policies
 * @param auth
 * @param app
 */
module.exports = function (app) {

    /**
     * Validate Routes
     */
    app.use(auth.routes(routes));

    /**
     * Create cookie login for control for angular
     */
    app.use(auth.cookie.initialize);

};