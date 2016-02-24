'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

/**
 * Strategy local sign up
 */
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(req.response.return());
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.setCookie(true,
                function () {
                    return res.json(req.response.return());
                }
            );
        });
    })(req, res, next);
});

/**
 * Strategy local sign in
 */
router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(req.response.return());
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.setCookie(true,
                function () {
                    return res.json(req.response.return());
                }
            );
        });
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
