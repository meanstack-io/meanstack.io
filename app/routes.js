/**
 * Routes
 *
 */

'use strict';

/**
 * Modules dependencies
 */
var Errors = require('meanstack/lib/route/Errors');

/**
 * Routes
 *
 * @param Router
 * @return {*} router
 */
var Routes = function (Router) {

    var router = Router();

    router.use(router.namespace(),
        Router().useController('/home', 'home'),

        /**
         * Errors(Router)
         *
         * Add page errors 400, 403, 500 and 400 for /namespace.
         */
        Errors(Router)
    );

    // Router for page index AngularJS.
    router.all('*', router.controller('index'));

    return router;
};

module.exports = Routes;
