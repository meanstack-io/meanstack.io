/**
 * Alter symbol of AngularJS because Handlebars possesses the same symbol.
 */
App.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
}]);

/**
 * Config application
 */
App.constant('settings', {
    path: {
        min: true,
        controller: "/javascripts/",
        image: "/images/",
        style: "/stylesheets/"
    },
    auth: {
        redirect: {
            notLogged: "/signin",
            logged: "/myaccount"
        },
        cookie: {
            flagAngularLogged: "login"
        }
    }
});
