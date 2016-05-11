'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    login = require('modules/account/login');

/**
 * Strategy local sign up.
 */
router.post('/', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user) {
        login(req, res, next, err, user);
    })(req, res, next);
});

module.exports = router;
