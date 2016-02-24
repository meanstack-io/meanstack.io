/* Init global settings and run the app */
App.run(["$rootScope", "settings", "$state", "$location", "auth", function ($rootScope, settings, $state, $location, auth) {
    // state to be accessed from view
    $rootScope.$state = $state;
    // settings to be accessed from view
    $rootScope.$settings = settings;

    // check auth to be accessed from view
    $rootScope.login = function () {
        return auth.check();
    };

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

        //if route have control access
        if(typeof toState.access !== 'undefined' && typeof toState.access.auth !== 'undefined'){
            var authRoute = toState.access.auth,
                redirect = {
                    notLogged: (typeof toState.access.redirect !== 'undefined')? toState.access.redirect : settings.auth.redirect.notLogged,
                    logged: (typeof toState.access.redirect !== 'undefined')? toState.access.redirect : settings.auth.redirect.logged
                };

            //Only access page if logged.
            if (authRoute && !auth.check()) {
                $location.path(redirect.notLogged).search({'r': toState.url});
            }
            //Only access page if not login.
            else if (!authRoute && auth.check()) {
                $location.path(redirect.logged);
            }
        }

    });
}]);