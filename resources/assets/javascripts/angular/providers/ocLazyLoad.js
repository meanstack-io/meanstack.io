angular.module("App")
    .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

        /**
         * ocLazyLoad https://oclazyload.readme.io/
         *   Configuration https://oclazyload.readme.io/docs/oclazyloadprovider
         */
        $ocLazyLoadProvider.config({
            debug: true
        });
    }]);
