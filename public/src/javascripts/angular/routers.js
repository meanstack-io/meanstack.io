App.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('home', {
            url: "/", //URL page
            templateUrl: "/view/home/index", //Route view
            data: {
                title: 'Home', //Title page
                description: 'MEANStack bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js' //Description Page
            },
            controller: "homeController", //Controller page
            resolve: {
                //Load dependencies
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            //Insert controller before id
                            insertBefore: '#load_controllers',
                            files: [
                                //Return controller path according destination and minification.
                                path.controller('homeController')
                            ]
                        }
                    );
                }]
            }
        })

        .state('documentation', {
            url: "/documentation",
            templateUrl: "/view/documentation/index",
            data: {title: 'Documentation'},
            controller: "documentationController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('documentationController')
                            ]
                        }
                    );
                }]
            }
        })

        .state('signup', {
            url: "/signup",
            templateUrl: "/view/login/signup",
            data: {title: 'Sign Up'},
            controller: "signupController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('signupController')
                            ]
                        }
                    );
                }]
            },
            //Control access
            access: {
                //Only access page if not login.
                auth: false
                /**
                 * Optional setting -> redirect: URL
                 * Default config settings.auth.redirect.(logged for auth true || notLogged for auth false)
                 */
            }
        })

        .state('signin', {
            url: "/signin",
            templateUrl: "/view/login/signin",
            data: {title: 'Sign In'},
            controller: "signinController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('signinController')
                            ]
                        }
                    );
                }]
            },
            //Control access
            access: {
                //Only access page if not login.
                auth: false
                /**
                 * Optional setting -> redirect: URL
                 * Default config settings.auth.redirect.(logged for auth true || notLogged for auth false)
                 */
            }
        })

        .state('forgot', {
            url: "/forgot",
            templateUrl: "/view/login/forgot",
            data: {title: 'Forgot account'},
            controller: "forgotController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('forgotController')
                            ]
                        }
                    );
                }]
            },
            //Control access
            access: {
                //Only access page if not login.
                auth: false
                /**
                 * Optional setting -> redirect: URL
                 * Default config settings.auth.redirect.(logged for auth true || notLogged for auth false)
                 */
            }
        })

        .state('forgotToken', {
            url: "/forgot/:token",
            templateUrl: "/view/login/forgot/reset",
            data: {title: 'Reset your password'},
            controller: "forgotResetPasswordController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('forgotResetPasswordController')
                            ]
                        }
                    );
                }]
            },
            //Control access
            access: {
                //Only access page if not login.
                auth: false
                /**
                 * Optional setting -> redirect: URL
                 * Default config settings.auth.redirect.(logged for auth true || notLogged for auth false)
                 */
            }
        })

        .state('user', {
            url: "/user",
            templateUrl: "/view/user/index",
            data: {title: 'User'},
            controller: "userController",
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_controllers',
                            files: [
                                path.controller('userController')
                            ]
                        }
                    );
                }]
            },
            //Control access
            access: {
                //Only access page if logged.
                auth: true
                /**
                 * Optional setting -> redirect: URL
                 * Default config settings.auth.redirect.(logged for auth true || notLogged for auth false)
                 * ex: redirect: '/signin'
                 * result url: domain.com/signin?r=/user
                 */
            }
        })

        .state('404', {
            templateUrl: "/view/error/404",
            data: {title: 'Page Not Found'}
        });

    //Otherwise go page not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
    });
}]);