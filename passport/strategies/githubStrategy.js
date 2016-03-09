'use strict';

var githubStrategy = require('passport-github').Strategy,
    settings = require('../../config'),
    findOrCreateOAuth = require('./_findOrCreateOAuth');

/**
 * Strategy GitHub
 */
module.exports = function (passport) {
    passport.use('github',
        new githubStrategy(
            {
                clientID: settings.githubStrategy.clientID,
                clientSecret: settings.githubStrategy.clientSecret,
                callbackURL: settings.githubStrategy.callbackURL,
                scope: ['user:email'],
                passReqToCallback: true
            },
            function (req, token, refreshToken, profile, done) {
                findOrCreateOAuth(req, token, refreshToken, profile, done);
            }
        )
    );
};