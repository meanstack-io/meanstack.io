angular.module("App")
    .run(["route", function (route) {
        // bootstrap templateNamespace and redirect to error pages.
        route.bootstrap();

    }]);
