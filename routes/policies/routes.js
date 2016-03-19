'use strict';

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
module.exports = [
    {
        route: '/view/user',
        auth: true
    },
    {
        route: '/view/login/signin',
        auth: false
    },
    {
        route: '/view/login/signup',
        auth: false
    },
    {
        route: '/view/login/forgot',
        auth: false
    },
    {
        route: '/view/login/forgot/reset',
        auth: false
    }
];
