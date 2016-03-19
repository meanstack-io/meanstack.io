'use strict';

var facebookStrategy = require('passport-facebook').Strategy,
    settings = require('../../config'),
    findOrCreateOAuth = require('./_findOrCreateOAuth');
/**
 * Strategy Facebook
 */
module.exports = function (passport) {
    passport.use('facebook',
        new facebookStrategy(
            {
                clientID: settings.facebookStrategy.clientID,
                clientSecret: settings.facebookStrategy.clientSecret,
                callbackURL: settings.facebookStrategy.callbackURL,
                profileFields: ['id', 'displayName', 'emails'],
                passReqToCallback: true
            },
            function (req, token, refreshToken, profile, done) {
                findOrCreateOAuth(req, token, refreshToken, profile, done);
            }
        )
    );
};
