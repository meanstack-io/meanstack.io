/*
 |--------------------------------------------------------------------------
 | Logger
 |--------------------------------------------------------------------------
 |
 | Morgan:
 |   HTTP request logger middleware for node.js.
 |   Documentation: https://www.npmjs.com/package/morgan
 |
 | Winston
 |   A multi-transport async logging library for node.js.
 |
 */

var path = require('path'),
    pathLog = path.resolve(__dirname, '../log');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Log access
     |--------------------------------------------------------------------------
     |
     | Format to access log(combined, common, dev, short, tiny).
     |
     */
    access: {
        file: {
            format: 'combined',
            stream: {
                path: pathLog,
                name: 'access-%DATE%.log',
                date_format: 'YYYYMMDD',
                frequency: 'daily'
            }
        },
        // Optional [console]
        console: {
            format: 'dev'
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Log system
     |--------------------------------------------------------------------------
     |
     |
     */
    system: {
        file: {
            filename: pathLog + '/logs.log',
            maxsize: 2097152, //2MB
            maxFiles: 10
        },
        // Optional [console]
        console: {
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Log exception
     |--------------------------------------------------------------------------
     |
     |
     */
    exception: {
        exitOnError: false,

        file: {
            filename: pathLog + '/exceptions.log',
            maxsize: 2097152, //2MB
            maxFiles: 10
        }
    }
};
