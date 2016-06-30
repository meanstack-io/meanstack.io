/**
 * Listening the directive and add value on the front end.
 * Used to change the user's name on the front end.
 *
 * Example:
 *   <span compile="username">Value</span>
 */
App.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);

                $compile(element.contents())(scope);
            }
        );
    };
}]);
