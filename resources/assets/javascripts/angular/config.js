/**
 * Config application
 */
App.constant('config', {
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
    }
});
