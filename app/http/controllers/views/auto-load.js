'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Auto load views AngularJS.
 */
router.get('*', function (req, res) {

    var url = (req.params[0]).substr(1);

    res.render(url);
});

module.exports = router;
