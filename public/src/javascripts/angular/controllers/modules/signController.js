angular.module("App")
    .controller("signupController", ['$rootScope', '$scope', 'request', '$location', '$templateCache', function ($rootScope, $scope, request, $location, $templateCache) {

        /**
         * Signup strategy local
         */
        $scope.signUp = function(){
            request('/account/signup').post(
                {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    confirmPassword: $scope.confirmPassword
                }, function (response) {
                    if(response.success){
                        $templateCache.removeAll();
                        $location.path('/user');
                    }else{
                        toaster.error("Error", response.msg.join('<br>'));
                        console.log(response);
                    }
                }
            );
        };

    }]);

angular.module("App")
    .controller("signinController", ['$rootScope', '$scope', 'request', '$location', '$stateParams', 'toaster', '$templateCache', function ($rootScope, $scope, request, $location, $stateParams, toaster, $templateCache) {

        $scope.r = ($stateParams.r)? 'Not authorized access '+$stateParams.r : null;

        /**
         * Signin strategy local
         */
        $scope.signIn = function(){
            request('/account/signin').post(
                {
                    email: $scope.email,
                    password: $scope.password
                }, function (response) {
                    if(response.success){
                        $templateCache.removeAll();
                        $location.path('/user');
                    }else{
                        toaster.error("Error", response.msg.join('<br>'));
                        console.log(response);
                    }
                }
            );
        };

    }]);