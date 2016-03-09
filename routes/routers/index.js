'use strict';

var express = require('express'),
    router = express.Router(),
    settings = require('../../config');

/**
 * Router for page index AngularJS
 */
router.get('/:ever*?', function (req, res) {
    res.render('index',
        {
            settings: {
                name: settings.name,
                version: settings.version
            }
        }
    );
});

module.exports = router;
