/**
 * Config Module Path
 */
App.config(['pathProvider', 'settings', function (pathProvider, settings) {
    pathProvider.setSettings(settings.path);
}]);