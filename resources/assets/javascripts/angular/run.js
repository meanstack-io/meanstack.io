/**
 *  Init global settings and run the app
 */
App.run(["$rootScope", "settings", "$state", "auth", function ($rootScope, settings, $state, auth) {
    // state to be accessed from view
    $rootScope.$state = $state;
    // settings to be accessed from view
    $rootScope.$settings = settings;

    // check auth to be accessed from view
    $rootScope.login = function () {
        return auth.check();
    };

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

        //Route control access
        auth.routeAuth(toState);

    });
}]);
