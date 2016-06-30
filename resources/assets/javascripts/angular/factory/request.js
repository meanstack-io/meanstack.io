/**
 * Factory request
 */
angular.module("App").factory('request',
    ['$resource', function ($resource) {
        return function (url) {
            return $resource(
                url,
                {},
                {
                    'post': {
                        method: 'POST'
                    }
                }
            );
        };
    }]
);
