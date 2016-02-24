'use strict';

/**
 * Config Authentication
 * @param auth
 * @param app
 */
module.exports = function (auth, app) {

    /**
     * Set routes for authentication
     * [
     *   {
     *      route: '/sign/up', //Required, route for valid
     *      method: ['post','get',...], //Optional, Method for valid, if not exist valid all method
     *      auth: true, //if route is authenticated true for false
     *   },
     * ]
     * @type {*[]}
     */
    var routes = [
        {
            route: '/view/user',
            auth: true
        },
        {
            route: '/view/sign/in',
            auth: false
        },
        {
            route: '/view/sign/up',
            auth: false
        },
        {
            route: '/view/documentation',
            auth: true,
            method: ['get', 'POST']
        }
    ];

    /**
     * Validate Routes
     */
    app.use(auth.routes(routes));

    /**
     * Create cookie login for control for angular
     */
    app.use(auth.cookie.initialize);

};