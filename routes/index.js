'use strict';

var express = require('express'),
    router = express.Router(),
    settings = require('../configs/app');

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
