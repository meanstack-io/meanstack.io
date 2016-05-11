App.controller('headerController', ['$scope', '$rootScope', '$location', 'request', '$templateCache', function ($scope, $rootScope, $location, request, $templateCache) {
    /**
     * Active navegation
     *
     * @param viewLocation
     * @returns {boolean}
     */
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    /**
     * Alter username navbar.
     */
    $rootScope.$on('username', function(event, name) {
        $scope.username = name;
    });

    /**
     * Logoff
     */
    $scope.logout = function () {
        request('/account/logoff').post(
            {},
            function (response) {
                if (response.success) {
                    $templateCache.removeAll();
                    return $location.path('/');
                }
                return $location.refresh();
            }
        );
    };
}]);
