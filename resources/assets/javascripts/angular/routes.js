angular.module("App")
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'config',
        function ($stateProvider, $urlRouterProvider, $locationProvider, config) {

            // Namespace used for define route.
            var namespace = function (route) {
                return '/' + config.route.namespace + '/' + route;
            };

            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: namespace("home"),
                    data: {
                        title: 'Home',
                        description: 'MEANStack.io bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js'
                    },
                    controller: "homeController",
                    resolve: {
                        deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                            return $ocLazyLoad.load({
                                    insertBefore: '#load_js_before',
                                    files: [
                                        path.controller('homeController')
                                    ]
                                }
                            );
                        }]
                    }
                })

                .state('404', {
                    templateUrl: namespace("error/404"),
                    data: {title: 'Page not found'}
                })

                .state('403', {
                    templateUrl: namespace("error/403"),
                    data: {title: 'Not authorized'}
                })

                .state('500', {
                    templateUrl: namespace("error/500"),
                    data: {title: 'Internal server error'}
                });

            $urlRouterProvider.otherwise(function ($injector, $location) {
                $injector.get('$state').go('404');
                return $location.path();
            });
        }]);
