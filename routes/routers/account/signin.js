'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    login = require('./_login'),

    /**
     * Function login OAuth
     * @param req
     * @param res
     * @param next
     * @param err
     * @param user
     * @returns {*}
     */
    loginOAuth = function (req, res, next, err, user) {
        if (err) {
            return next(err);
        }
        if (!user || !req.response.getSuccess()) {
            var error = req.response.getMsg();
            return res.redirect('/signin?error=' + error.join());
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.setCookie(true,
                function () {
                    res.redirect('/user');
                }
            );
        });
    };


/**
 * Strategy local sign in
 */
router.post('/', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user) {
        login(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Facebook
 */
router.get('/facebook', passport.authenticate('facebook'));

/**
 * Handle the callback after facebook has authenticated the user
 */
router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Google
 */
router.get('/google', passport.authenticate('google'));

/**
 * Handle the callback after Google has authenticated the user
 */
router.get('/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Linkedin
 */
router.get('/linkedin', passport.authenticate('linkedin'));

/**
 * Handle the callback after Linkedin has authenticated the user
 */
router.get('/linkedin/callback', function (req, res, next) {
    passport.authenticate('linkedin', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Twitter
 */
router.get('/twitter', passport.authenticate('twitter'));

/**
 * Handle the callback after Twitter has authenticated the user
 */
router.get('/twitter/callback', function (req, res, next) {
    passport.authenticate('twitter', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Google
 */
router.get('/github', passport.authenticate('github'));

/**
 * Handle the callback after Google has authenticated the user
 */
router.get('/github/callback', function (req, res, next) {
    passport.authenticate('github', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

module.exports = router;
