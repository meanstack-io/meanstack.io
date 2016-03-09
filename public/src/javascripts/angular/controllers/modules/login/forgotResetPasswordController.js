angular.module("App")
    .controller("forgotResetPasswordController", ['$rootScope', '$scope', 'request', '$location', '$templateCache', 'toaster', '$stateParams', function ($rootScope, $scope, request, $location, $templateCache, toaster, $stateParams) {

        /**
         * Reset password
         */
        $scope.resetPassword = function () {
            request('/account/forgot/reset').post(
                {
                    token: $stateParams.token,
                    password: $scope.password,
                    repassword: $scope.repassword
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
