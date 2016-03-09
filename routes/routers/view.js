'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Load views AngularJS
 */
router.get('*', function (req, res) {

    var url = (req.params[0]).substr(1);

    res.render(url);
});

module.exports = router;
