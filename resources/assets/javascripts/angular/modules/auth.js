/**
 * Module authentication for AngularJS.
 *
 * Example:
 *
 *   // Auth false
 *   .state('signup', {
 *       url: "/signup",
 *       templateUrl: "/view/login/signup",
 *       ...
 *       // Control access
 *       access: {
 *           // Only access page if not login.
 *           auth: false,
 *           // Optional redirect: URL
 *           redirect: '/myaccount',
 *       }
 *       ...
 *
 *   // Auth true
 *   .state('myaccount', {
 *       url: "/myaccount",
 *       ...
 *       // Control access
 *       access: {
 *           // Only access page if logged.
 *           auth: true,
 *           // Optional setting -> redirect: URL
 *           redirect: '/signin'
 *           // redirect result, domain.com/signin?r=/myaccount
 *       }
 *       ...
 *
 * === Config redirect default in file ../config.js ===
 *
 *   ...
 *   "auth": {
 *       redirect: {
 *           notLogged: "/signin",
 *           logged: "/myaccount"
 *       }
 *   }
 *   ...
 *
 *
 * === Check user is logged ===
 *
 * return {boolean}
 * service.check()
 *
 */
var AppPath = angular.module('AppAuth', []);

AppPath.provider("auth", [function () {
    var settings_default = {
            "auth": {
                redirect: {
                    notLogged: "/signin",
                    logged: "/myaccount"
                },
                "cookie": {
                    flagAngularLogged: "login"
                }
            }
        },
        settings = {};

    this.setSettings = function (op_settings) {
        settings = angular.extend(settings_default, op_settings);
    };

    this.$get = ['settings', '$location',
        function (settings, $location) {
            var service = {};

            /**
             * Check user is logged
             *
             * @returns {boolean}
             */
            service.check = function () {
                var cookieName = settings.auth.cookie.flagAngularLogged,
                    getCookieValues = function (cookie) {
                        var cookieArray = cookie.split('=');
                        return cookieArray[1].trim();
                    },
                    getCookieNames = function (cookie) {
                        var cookieArray = cookie.split('=');
                        return cookieArray[0].trim();
                    },
                    cookies = document.cookie.split(';'),
                    cookieValue = cookies.map(getCookieValues)[cookies.map(getCookieNames).indexOf(cookieName)];

                return (((cookieValue === undefined) ? null : cookieValue) === "true");
            };

            /**
             * Route control access
             *
             * @param toState
             */
            service.routeAuth = function (toState) {
                //if route have control access
                if (typeof toState.access !== 'undefined' && typeof toState.access.auth !== 'undefined') {
                    var authRoute = toState.access.auth,
                        redirect = {
                            notLogged: (typeof toState.access.redirect !== 'undefined') ? toState.access.redirect : settings.auth.redirect.notLogged,
                            logged: (typeof toState.access.redirect !== 'undefined') ? toState.access.redirect : settings.auth.redirect.logged
                        };

                    //Only access page if logged.
                    if (authRoute && !service.check()) {
                        $location.path(redirect.notLogged).search({'r': toState.url});
                    }
                    //Only access page if not login.
                    else if (!authRoute && service.check()) {
                        $location.path(redirect.logged);
                    }
                }
            };

            return service;
        }
    ];
}]);
