'use strict';

var passport = require('passport'),
    User = require('app/models/user').User,
    localStrategy = require('./local-strategy'),
    facebookStrategy = require('./facebook-strategy'),
    googleStrategy = require('./google-strategy'),
    twitterStrategy = require('./twitter-strategy'),
    linkedinStrategy = require('./linkedin-strategy'),
    githubStrategy = require('./github-strategy');

/**
 * Create strategies to login.
 *
 * @param app
 */
module.exports = function (app) {

    /**
     * Init Passaport.
     */
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Serialize id user for session.
     */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    /**
     * Find user by deserialize id.
     */
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * Strategy Local.
     * Sign In, Sign Up
     */
    localStrategy(passport);

    /**
     * Strategy Facebook.
     */
    facebookStrategy(passport);

    /**
     * Strategy Google.
     */
    googleStrategy(passport);

    /**
     * Strategy Twitter.
     */
    twitterStrategy(passport);

    /**
     * Strategy Linkedin.
     */
    linkedinStrategy(passport);

    /**
     * Strategy GitHub.
     */
    githubStrategy(passport);
};
