'use strict';

var settings = require('../configs/app');

/**
 * Controls access to routes.
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
                if (req.user) {
                    return next();
                }
                return res.render('error/403');
            }
            else if (typeof route.auth !== 'undefined' && route.auth === false) {
                if (!req.user) {
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
 * @private
 */
function _cookie() {

    this.initialize = function (req, res, next) {

        function setCookie(val, callback) {
            res.cookie(settings.cookie.flagAngularLogged, val, {path: '/', httpOnly: false, maxAge: 3600000});
            if (callback) {
                callback();
            }
        }

        if (!req.setCookie) {
            req.setCookie = setCookie;
        }

        if (req.user) {
            res.cookie('login', true, {path: '/', httpOnly: false, maxAge: 3600000});
            return next();
        }
        res.cookie('login', false, {path: '/', httpOnly: false, maxAge: 3600000});
        return next();
    };
}

module.exports.cookie = new _cookie();