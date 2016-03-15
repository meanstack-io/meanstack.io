var AppPath = angular.module('AppPath', []);

AppPath.provider("path", [function () {
    var settings_default = {
            "path": {
                "min": true,
                "controller": "/dist/javascripts/",
                "image": "/dist/images/",
                "style": "/dist/stylesheets/"
            }
        },
        settings = {};

    this.setSettings = function (op_settings) {
        settings = angular.extend(settings_default, op_settings);
    };

    this.$get = ['settings',
        function (settings) {
            var service = {},
                min = (typeof settings.path.min === true);
                extension = function (type) {
                    return ((min) ? '.min' : '') + '.' + type;
                };

            /**
             * Return controller path according destination and minification.
             * @param nameController
             * @returns {*}
             */
            service.controller = function (nameController) {
                return settings.path.controller + nameController + extension('js');
            };

            return service;
        }
    ];
}]);