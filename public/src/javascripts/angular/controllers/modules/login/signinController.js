angular.module("App")
    .controller("signinController", ['$rootScope', '$scope', 'request', '$location', 'toaster', '$templateCache', function ($rootScope, $scope, request, $location, toaster, $templateCache) {

        var params = $location.search(),
            message = (params.r) ? 'Not authorized access ' + params.r : (params.error) ? params.error : null;
        if (message) {
            toaster.error("Error", message);
        }

        /**
         * Signin strategy local
         */
        $scope.signIn = function () {
            request('/account/signin').post(
                {
                    email: $scope.email,
                    password: $scope.password
                }, function (response) {
                    if (response.success) {
                        $templateCache.removeAll();
                        $location.path('/user');
                    } else {
                        toaster.error("Error", response.msg.join('<br>'));
                    }
                }
            );
        };
    }]);
