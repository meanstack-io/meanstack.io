var AppPath = angular.module('AppAuth', []);

AppPath.provider("auth", [function () {
    var settings_default = {
            "auth": {
                redirect: {
                    notLogged: "/signin",
                    logged: "/user"
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
             * @returns {boolean}
             */
            service.check = function () {
                var cookieName = settings.auth.cookie.flagAngularLogged,
                    regexp = new RegExp("(?:^" + cookieName + "|;\s*" + cookieName + ")=(.*?)(?:;|$)", "g"),
                    result = regexp.exec(document.cookie);
                return (result === null) ? false : ((result[1]).valueOf() === 'true');
            };

            /**
             * Route control access
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