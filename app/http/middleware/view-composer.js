'use strict';

var settings = require('config');

/**
 * View Composer.
 * More documentation: http://expressjs.com/en/api.html#res.locals
 *
 * @param req
 * @param res
 * @param next
 */
var viewComposer = function (req, res, next) {
    /**
     * Auxiliary function.
     * Returns the User or false.
     *
     * @param req
     * @returns {*}
     */
    var user = function (req) {
        return (req.isAuthenticated()) ? req.user : false;
    };

    /**
     * Locals settings.
     *
     * @type {{name: string, version: string}}
     */
    res.locals.settings = {
        name: settings.name,
        version: settings.version
    };

    /**
     * Locals user.
     *
     * Example:
     *   {{#if user}}
     *     {{ user.username }}
     *   {{/if}}
     *
     * @type {Object|Boolean}
     */
    res.locals.user = user(req);

    /**
     * Locals isAuthenticated
     * Return true if the User is logged.
     *
     * @type {Boolean}
     */
    res.locals.isAuthenticated = req.isAuthenticated();

    /**
     * Locals isUnauthenticated
     * Return true if the User not logged.
     *
     * @type {Boolean}
     */
    res.locals.isAuthenticated = req.isUnauthenticated();

    next();
};

module.exports = viewComposer;
