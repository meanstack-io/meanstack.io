'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    login = require('modules/account/login'),
    loginOAuth = require('modules/account/login/oauth');


/**
 * Strategy local sign in.
 */
router.post('/', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user) {
        login(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Facebook.
 */
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

/**
 * Handle the callback after Facebook has authenticated the user.
 */
router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Google.
 */
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

/**
 * Handle the callback after Google has authenticated the user.
 */
router.get('/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Linkedin.
 */
router.get('/linkedin', passport.authenticate('linkedin'));

/**
 * Handle the callback after Linkedin has authenticated the user.
 */
router.get('/linkedin/callback', function (req, res, next) {
    passport.authenticate('linkedin', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Twitter.
 */
router.get('/twitter', passport.authenticate('twitter'));

/**
 * Handle the callback after Twitter has authenticated the user.
 */
router.get('/twitter/callback', function (req, res, next) {
    passport.authenticate('twitter', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

/**
 * Strategy Signin Github.
 */
router.get('/github', passport.authenticate('github'));

/**
 * Handle the callback after Github has authenticated the user.
 */
router.get('/github/callback', function (req, res, next) {
    passport.authenticate('github', function (err, user) {
        loginOAuth(req, res, next, err, user);
    })(req, res, next);
});

module.exports = router;
