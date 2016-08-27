angular.module("App")
    .config(['config', 'routeProvider', function (config, routeProvider) {

        /**
         * Config route module
         */
        routeProvider.config(config.route);
    }]);
