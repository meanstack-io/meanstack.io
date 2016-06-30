angular.module("App")
    .controller("forgotController", ['$rootScope', '$scope', 'request', '$location', 'toaster', function ($rootScope, $scope, request, $location, toaster) {

        /**
         * Forgot password
         */
        $scope.forgot = function () {
            request('/account/forgot').post(
                {
                    email: $scope.email
                }, function (response) {
                    if (response.success) {
                        toaster.success("Success", response.msg.join('<br>'));
                    } else {
                        toaster.error("Error", response.msg.join('<br>'));
                    }
                }
            );
        };
    }]);
