'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

/**
 * Create strategy to login
 * @param passport
 */
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findUser(id, done);
    });

    /**
     * Strategy local singin
     */
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.login(req, email, password, done);
        }
    ));

    /**
     * Strategy local singup
     */
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.create(req, email, password, done);
        }
    ));

};