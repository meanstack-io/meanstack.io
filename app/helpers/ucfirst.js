'use strict';

var hbs = require('express-hbs');

module.exports = function () {
    /**
     * Make a string's first character uppercase.
     *
     * @param str
     * @returns {string}
     */
    hbs.registerHelper('ucfirst', function (str) {
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    });
};
