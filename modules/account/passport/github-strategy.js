'use strict';

var githubStrategy = require('passport-github').Strategy,
    settings = require('config'),
    findOrCreateOAuth = require('./find-or-create-oauth');

/**
 * Strategy GitHub.
 */
module.exports = function (passport) {
    passport.use('github',
        new githubStrategy(
            {
                clientID: settings.githubStrategy.clientID,
                clientSecret: settings.githubStrategy.clientSecret,
                callbackURL: settings.githubStrategy.callbackURL,
                passReqToCallback: true,
                scope: ['user:email']
            },
            function (req, token, refreshToken, profile, done) {
                findOrCreateOAuth(req, token, refreshToken, profile, done);
            }
        )
    );
};
