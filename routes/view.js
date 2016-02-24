'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Load views AngularJS
 */
router.get('/:param1/:param2*?', function (req, res) {

    var url = "";
    url += req.params.param1;
    if (typeof req.params.param2 !== 'undefined') {
        url += '/' + req.params.param2;
    }

    res.render(url);
});

module.exports = router;
