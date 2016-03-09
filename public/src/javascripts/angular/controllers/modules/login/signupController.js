angular.module("App")
    .controller("signupController", ['$rootScope', '$scope', 'request', '$location', 'toaster', '$templateCache', function ($rootScope, $scope, request, $location, toaster, $templateCache) {

        /**
         * Signup strategy local
         */
        $scope.signUp = function () {
            request('/account/signup').post(
                {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    confirmPassword: $scope.confirmPassword
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
