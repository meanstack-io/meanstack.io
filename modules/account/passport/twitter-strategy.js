'use strict';

var twitterStrategy = require('passport-twitter').Strategy,
    settings = require('config'),
    findOrCreateOAuth = require('./find-or-create-oauth');

/**
 * Strategy Twitter.
 */
module.exports = function (passport) {
    passport.use('twitter',
        new twitterStrategy(
            {
                consumerKey: settings.twitterStrategy.consumerKey,
                consumerSecret: settings.twitterStrategy.consumerSecret,
                callbackURL: settings.twitterStrategy.callbackURL,
                includeEmail : true,
                passReqToCallback: true
            },
            function (req, token, refreshToken, profile, done) {
                findOrCreateOAuth(req, token, refreshToken, profile, done);
            }
        )
    );
};
