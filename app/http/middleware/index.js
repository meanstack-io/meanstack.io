'use strict';

var policies = require('app/policies'),
    viewComposer = require('./view-composer'),
    response = require('modules/response'),
    passport = require('modules/account/passport');

/**
 * Initialize middleware.
 *
 * @param app
 */
module.exports = function (app) {

    /**
     * Init Passaport.
     */
    passport(app);

    /**
     * Module Auth.
     */
    policies(app);

    /**
     * View Composer.
     */
    app.use(viewComposer);

    /**
     * Module Response.
     */
    app.use(response());
};
