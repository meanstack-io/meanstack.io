'use strict';

var routes = require('./routes'),
    auth = require('modules/auth'),
    settings = require('config');

/**
 * Policies
 *
 * @param app
 */
module.exports = function (app) {

    /**
     * Validate Routes.
     */
    app.use(auth.routes(routes));

    /**
     * Create cookie for control angular.
     */
    app.use(auth.cookie(settings.cookie));

};
