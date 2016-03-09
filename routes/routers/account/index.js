'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    login = require('./_login');

/**
 * Strategy local sign up
 */
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user) {
        login(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Logoff
 */
router.post('/logoff', function (req, res) {
    req.setCookie(false,
        function () {
            req.logout();
            req.response.setSuccess();
            res.json(req.response.return());
        }
    );
});

module.exports = router;
