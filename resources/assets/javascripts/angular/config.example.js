/**
 * Config application
 */
angular.module('App')
    .constant('config', {
        /**
         * Configuration module meanstack.path
         */
        path: {
            minify: false,
            scripts: '/javascripts/',
            controllers: '/javascripts/controllers/',
            images: '/images/',
            styles: '/stylesheets/',
            libs: '/libs/'
        },

        /**
         * Configuration module meanstack.route
         */
        route: {
            namespace: 'api'
        },

        /**
         * Configuration module meanstack.metaTags
         * === Set values default for ENV ===
         *
         */
        metaTags: {
            'robots': {
                'value': 'noindex, nofollow'
            }
        }
    });
