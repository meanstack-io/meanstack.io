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
    "minFiles": true,
    "path": {
        "controller": "/dist/javascripts/",
        "image": "/dist/images/",
        "style": "/dist/stylesheets/"
    },
    "auth": {
        redirect: {
            notLogged: "/signin",
            logged: "/user"
        }
    },
    "cookie": {
        flagAngularLogged: "login"
    }
});