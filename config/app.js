var path = require('path');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Application information
     |--------------------------------------------------------------------------
     |
     */
    'name': 'MEANStack.io',
    'description': 'bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js',
    'version': "0.3.9",

    /*
     |--------------------------------------------------------------------------
     | Application listen
     |--------------------------------------------------------------------------
     |
     */
    'hostname': 'localhost',
    'port': '8000',

    /*
     |--------------------------------------------------------------------------
     | Application URL
     |--------------------------------------------------------------------------
     |
     */
    'url': 'http://localhost:8000/',

    /*
     |--------------------------------------------------------------------------
     | Autoloaded Service Providers
     |--------------------------------------------------------------------------
     |
     */
    'providers': [
        /*
         * MEANStack Framework Service Providers...
         */
        'meanstack/lib/log/LogServiceProvider',
        'meanstack/lib/log/LogAccessServiceProvider',
        'meanstack/lib/view/ViewServiceProvider',
        'meanstack/lib/helpers/HelpersServiceProvider',
        'meanstack/lib/session/SessionServiceProvider',
        'meanstack/lib/bodyParser/BodyParserServiceProvider',
        'meanstack/lib/cookieParser/CookieParserServiceProvider',
        // 'meanstack/lib/database/DatabaseServiceProvider',
        'meanstack/lib/response/ResponseServiceProvider',

        /*
         * Application Service Providers...
         */
        //

        /*
         * Router Service Provider
         */
        'meanstack/lib/route/RouterServiceProvider'
    ],

    /*
     |--------------------------------------------------------------------------
     | Application routes
     |--------------------------------------------------------------------------
     |
     | Used to initialize routes.
     |
     */
    'routes': path.resolve(__dirname, '../app/routes'),

    /*
     |--------------------------------------------------------------------------
     | Application controllers, models and requests
     |--------------------------------------------------------------------------
     |
     | Used by meanstack-client.
     |
     */
    'controllers': path.resolve(__dirname, '../app/controllers'),
    'models': path.resolve(__dirname, '../app/models'),
    'requests': path.resolve(__dirname, '../app/requests'),

    /*
     |--------------------------------------------------------------------------
     | Application namespace
     |--------------------------------------------------------------------------
     |
     | Used for the routes of angular.
     |
     */
    'namespace': 'api',

    /*
     |--------------------------------------------------------------------------
     | Application Environment
     |--------------------------------------------------------------------------
     |
     | File to configuration your application environment.
     |
     */
    'env': path.resolve(__dirname, '../.env.js')
};
