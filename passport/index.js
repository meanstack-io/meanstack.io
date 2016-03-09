'use strict';

var modelUser = require('../models/users').Users,
    localStrategy = require('./strategies/localStrategy'),
    facebookStrategy = require('./strategies/facebookStrategy'),
    googleStrategy = require('./strategies/googleStrategy'),
    twitterStrategy = require('./strategies/twitterStrategy'),
    linkedinStrategy = require('./strategies/linkedinStrategy'),
    githubStrategy = require('./strategies/githubStrategy');

/**
 * Create strategy to login
 * @param passport
 */
module.exports = function (passport) {

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
        modelUser.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * Strategy Local
     * Sign In, Sign Up
     */
    localStrategy(passport);

    /**
     * Strategy Facebook
     */
    facebookStrategy(passport);

    /**
     * Strategy Google
     */
    googleStrategy(passport);

    /**
     * Strategy Twitter
     */
    twitterStrategy(passport);

    /**
     * Strategy Linkedin
     */
    linkedinStrategy(passport);

    /**
     * Strategy GitHub
     */
    githubStrategy(passport);
};