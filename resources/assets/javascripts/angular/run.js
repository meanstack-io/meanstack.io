angular.module("App")
    .run(["$rootScope", "$state", function ($rootScope, $state) {
        // State to be accessed from view
        $rootScope.$state = $state;

        // If error handler go to page error angular.
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            event.preventDefault();

            if (error.status === 404) {
                return $state.go('404');
            } else if (error.status === 403) {
                return $state.go('403');
            }

            return $state.go('500');
        });
    }]);
