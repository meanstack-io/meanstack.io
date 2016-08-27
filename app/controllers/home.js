/**
 * Home
 *
 */

'use strict';

/**
 * Module dependencies.
 */
var router = require('meanstack').Router();

// Index
router.get('/', function (req, res) {
    res.render('home');
});

module.exports = router;
