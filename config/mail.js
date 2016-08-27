/*
 |--------------------------------------------------------------------------
 | Mail
 |--------------------------------------------------------------------------
 |
 | Options:
 |
 | 'smtp': {} // Documentation Nodemailer: https://github.com/nodemailer/nodemailer
 |
 | 'template': {
 |      'path': path.resolve(__dirname, '../resources/views/mail'),
 |      'options': {} // https://github.com/crocodilejs/node-email-templates#template-engine-options
 | }
 |
 */

var path = require('path');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Simple Mail Transfer Protocol
     |--------------------------------------------------------------------------
     |
     |
     */
    'smtp': {
        'from': '"MEANStack" <meanstack@example.io>',
        'host': 'smtp.gmail.com',
        'secure': true,
        'port': '465',
        'auth': {
            'user': '##########@gmail.com',
            'pass': '##########'
        },
        'logger': true,
        'debug': true
    },

    /*
     |--------------------------------------------------------------------------
     | Template emails
     |--------------------------------------------------------------------------
     |
     |
     */
    'template': {
        'path': path.resolve(__dirname, '../resources/views/mail')
    }
};
