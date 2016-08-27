/**
 * Index
 *
 */

'use strict';

/**
 * Module dependencies.
 */
var router = require('meanstack').Router();

// Router for page index AngularJS.
router.get('/:ever*?', function (req, res) {
    res.render('index');
});

module.exports = router;
