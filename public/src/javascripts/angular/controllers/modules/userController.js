angular.module("App")
    .controller("userController", ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        //Facebook login add hash #_=_ in URL
        var hash = $location.hash();
        if(hash === '_=_'){
            $location.hash();
        }
    }]);