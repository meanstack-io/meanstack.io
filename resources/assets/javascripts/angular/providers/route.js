angular.module('App')
    .config(['routeProvider', '$stateProvider', '$urlRouterProvider', 'config',
        function (routeProvider, $stateProvider, $urlRouterProvider, config) {

            /**
             * Config route module MEANStack
             */
            routeProvider.config(config.route);

            /**
             * Error routes.
             */
            $stateProvider
                .state('404', {
                    templateNamespace: 'error/404',
                    data: {title: 'Page not found'}
                })

                .state('403', {
                    templateNamespace: 'error/403',
                    data: {title: 'Not authorized'}
                })

                .state('500', {
                    templateNamespace: 'error/500',
                    data: {title: 'Internal server error'}
                });

            /**
             * Error 404.
             * If requested route not registered.
             */
            $urlRouterProvider.otherwise(function ($injector, $location) {
                $injector.get('$state').go('404');
                return $location.path();
            });
        }]);
