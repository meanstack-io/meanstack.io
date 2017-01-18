/*
 |--------------------------------------------------------------------------
 | View
 |--------------------------------------------------------------------------
 |
 |
 */

var path = require('path');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | View Path
     |--------------------------------------------------------------------------
     |
     | A directory or an array of directories for the application's views. If an
     | array, the views are looked up in the order they occur in the array.
     |
     */
    'path': path.resolve(__dirname, '../resources/views'),

    /*
     |--------------------------------------------------------------------------
     | View Public [Optional]
     |--------------------------------------------------------------------------
     |
     | Static files
     |  http://expressjs.com/pt-br/api.html#express.static
     |  http://expressjs.com/en/starter/static-files.html
     |
     */
    'static': {
        'path': path.join(__dirname, '../public'),
        'options': {
            'maxAge': 0
        }
    },

    /*
     |--------------------------------------------------------------------------
     | View cache [Optional]
     |--------------------------------------------------------------------------
     |
     | Enables view template compilation caching.
     | Note: true in production, otherwise undefined.
     |  http://expressjs.com/pt-br/api.html#app.settings.table
     |
     */
    //'cache': true,

    /*
     |--------------------------------------------------------------------------
     | View compression [Optional]
     |--------------------------------------------------------------------------
     |
     | Node.js compression middleware.
     |  The following compression codings are supported:
     |    - deflate
     |    - gzip
     |
     | https://github.com/expressjs/compression
     |
     */
    'compression': {
        'active': true
    },

    /*
     |--------------------------------------------------------------------------
     | "X-Powered-By: Express" [Optional]
     |--------------------------------------------------------------------------
     |
     | Enables the "X-Powered-By: Express" HTTP header.
     | In production it is highly recommended to disable.
     | Default True.
     |  http://expressjs.com/pt-br/api.html#app.settings.table
     |
     */
    // 'x-powered-by': true,

    /*
     |--------------------------------------------------------------------------
     | View favicon
     |--------------------------------------------------------------------------
     |
     |
     */
    'favicon': path.join(__dirname, '../public/images', 'favicon.png'),

    /*
     |--------------------------------------------------------------------------
     | View engine
     |--------------------------------------------------------------------------
     |
     | By default we use the handlebars as template engine.
     |  Documentation https://github.com/barc/express-hbs
     |
     */
    'engine': {
        /*
         |--------------------------------------------------------------------------
         | View layouts
         |--------------------------------------------------------------------------
         |
         | Path to layout templates
         |
         */
        'layoutsDir': path.resolve(__dirname, '../resources/views/layouts'),

        /*
         |--------------------------------------------------------------------------
         | View partials
         |--------------------------------------------------------------------------
         |
         | Path to layout partials
         |
         */
        'partialsDir': path.resolve(__dirname, '../resources/views/partials'),

        /*
         |--------------------------------------------------------------------------
         | View extension
         |--------------------------------------------------------------------------
         |
         | Extension for templates & partials.
         |
         */
        'extname': '.hbs'
    }
};
