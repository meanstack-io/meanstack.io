angular.module('App')
    .config(['$locationProvider', function ($locationProvider) {

        /**
         * location
         *   Documentation https://docs.angularjs.org/api/ng/provider/$locationProvider
         */
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
