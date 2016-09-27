angular.module('App')
    .config(['$interpolateProvider', function ($interpolateProvider) {

        /**
         * Alter symbol of AngularJS because Handlebars possesses the same symbol.
         *
         * Handlebars:
         *   Alternative delimiters are not supported.
         * https://github.com/wycats/handlebars.js#compatibility
         */
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);
