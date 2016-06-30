angular.module("App")
    .controller("signupController", ['$rootScope', '$scope', 'request', '$location', 'toaster', '$templateCache', function ($rootScope, $scope, request, $location, toaster, $templateCache) {

        /**
         * Sign up strategy local
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

                        // Alter username navbar.
                        $rootScope.$emit('username', response.data.username);

                        $location.path('/myaccount');
                    } else {
                        toaster.error("Error", response.msg.join('<br>'));
                    }
                }
            );
        };
    }]);
