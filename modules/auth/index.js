'use strict';

/**
 * Controls access to routes.
 *
 * @param routes
 * @returns {Function}
 */
module.exports.routes = function (routes) {

    return function (req, res, next) {

        var filtredRoute = routes.filter(
            function (route) {
                var indexRoute = (route.route.slice(-1) === '/') ? route.route + 'index' : route.route + '/index';
                if (route.route == req.url || indexRoute == req.url) {
                    if (typeof route.method !== 'undefined') {
                        if (Array.isArray(route.method)) {
                            var methods = route.method.map(
                                function (v) {
                                    return v.toLowerCase();
                                }
                            );

                            if (methods.indexOf((req.method).toLowerCase()) !== -1) {
                                return route;
                            }
                        }
                        else if ((route.method).toLowerCase() == (req.method).toLowerCase()) {
                            return route;
                        }
                    } else {
                        return route;
                    }
                }
            }
        );

        if (filtredRoute.length === 1) {
            var route = filtredRoute[0];
            if (typeof route.auth !== 'undefined' && route.auth === true) {
                if (req.isAuthenticated()) {
                    return next();
                }
                return res.render('error/403');
            }
            else if (typeof route.auth !== 'undefined' && route.auth === false) {
                if (req.isUnauthenticated()) {
                    return next();
                }
                return res.render('error/403');
            }
        } else if (filtredRoute.length > 1) {
            return next('You have double route validation.');
        }
        return next();

    }
};

/**
 * Create cookie for login control AngularJS
 *
 * @param cookie
 * @private
 */
module.exports.cookie = function(cookie) {

    return function (req, res, next) {

        function setCookie(val, callback) {
            res.cookie(cookie.flagAngularLogged, val, {path: '/', httpOnly: false, maxAge: cookie.maxAge});
            if (callback) {
                callback();
            }
        }

        if (!req.setCookie) {
            req.setCookie = setCookie;
        }

        if (req.isAuthenticated()) {
            return req.setCookie(true,
                function () {
                    return next();
                }
            );
        }
        return req.setCookie(false,
            function () {
                return next();
            }
        );
    };
};
