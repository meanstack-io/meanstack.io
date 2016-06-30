'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Router for page index AngularJS.
 */
router.get('/:ever*?', function (req, res) {
    res.render('index');
});

module.exports = router;
