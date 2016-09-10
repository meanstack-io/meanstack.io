angular.module("App").config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('home', {
        url: "/",
        templateNamespace: "home",
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
    });
}]);
