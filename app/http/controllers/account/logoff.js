'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Logoff.
 */
router.post('/', function (req, res) {
    req.setCookie(false,
        function () {
            req.logout();
            req.response.setSuccess();
            res.json(req.response.return());
        }
    );
});

module.exports = router;
