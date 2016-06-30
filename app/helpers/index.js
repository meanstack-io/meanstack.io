'use strict';

/**
 * Helpers for Handlebars.
 *
 * Example:
 *     {{ foo }} or {{ ucfirst variable }}
 *
 * More documentation:
 *     http://handlebarsjs.com/expressions.html#helpers,
 *     https://github.com/barc/express-hbs
 */
var hbs = require('express-hbs'),
    ucfirst = require('./ucfirst');

module.exports = function () {

    // Make a string's first character uppercase.
    ucfirst();

};
