/**
 * Module load file path.
 *   controller,
 *   image,
 *   style,
 *
 * Example:
 *
 *   ...
 *   controller: "homeController", //Controller page
 *   resolve: {
 *   //Load dependencies
 *   deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
 *       return $ocLazyLoad.load({
 *           //Insert controller before id
 *           insertBefore: '#load_controllers',
 *           files: [
 *               //Return controller path according destination and minify.
 *               path.controller('homeController')
 *           ]
 *       },
 *       ...
 *
 * === Config path directories in file ../config.js ===
 *
 *   ...
 *   path: {
 *       min: true,
 *       controller: "/javascripts/",
 *       image: "/images/",
 *       style: "/stylesheets/"
 *   },
 *   ...
 *
 */

var AppPath = angular.module('AppPath', []);

AppPath.provider("path", [function () {
    var settings_default = {
            "path": {
                "min": true,
                "controller": "/javascripts/",
                "image": "/images/",
                "style": "/stylesheets/"
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
             * Return controller path according destination and minify.
             *
             * @param controllerName
             * @returns {*}
             */
            service.controller = function (controllerName) {
                return settings.path.controller + controllerName + extension('js');
            };

            service.image = function (image) {
                return settings.path.image + image;
            };

            service.style = function (style) {
                return settings.path.style + style;
            };

            return service;
        }
    ];
}]);
