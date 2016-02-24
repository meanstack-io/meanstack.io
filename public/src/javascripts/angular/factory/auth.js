angular.module("App").factory('auth', ['settings', function (settings) {
    var service = {};

    /**
     * Check user is logged
     * @returns {boolean}
     */
    service.check = function () {
        var cookieName = settings.cookie.flagAngularLogged,
            regexp = new RegExp("(?:^" + cookieName + "|;\s*" + cookieName + ")=(.*?)(?:;|$)", "g"),
            result = regexp.exec(document.cookie);
        return (result === null) ? false : ((result[1]).valueOf() === 'true');
    };

    return service;
}]);