/**
 * Config Module Auth
 */
App.config(['authProvider', 'settings', function (authProvider, settings) {
    authProvider.setSettings(settings.auth);
}]);