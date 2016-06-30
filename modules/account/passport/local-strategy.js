'use strict';

var localStrategy = require('passport-local').Strategy,
    User = require('app/models/user').User;

/**
 * Strategy local.
 */
module.exports = function (passport) {

    /**
     * Strategy local singin.
     */
    passport.use('local-signin',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                User.findOne({email: new RegExp('^' + email + '$', "i")}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        req.response.setMsg('Incorrect e-mail.');
                        return done(null, false);
                    }
                    if (!user.validPassword(password)) {
                        req.response.setMsg('Incorrect password.');
                        return done(null, false);
                    }

                    req.response.setSuccess(true);
                    return done(null, user);
                });
            }
        )
    );

    /**
     * Strategy local singup.
     */
    passport.use('local-signup',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                var data = req.body,
                    validaEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                if (!data.username) {
                    req.response.setMsg('Please enter your username !');
                }
                if (!validaEmail.test(email)) {
                    req.response.setMsg('Please enter a valid email address !');
                }
                if (password.length < 6) {
                    req.response.setMsg('Your password must have more than 6 characters !');
                }
                if (password != data.confirmPassword) {
                    req.response.setMsg('Make sure your passwords are the same !');
                }

                User.findOne({email: new RegExp('^' + email + '$', "i")}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        req.response.setMsg('E-mail already registered.');
                    }
                    if (req.response.hasMsg()) {
                        return done(null, false);
                    }

                    var newUser = new User();
                    newUser._id = newUser.newObjectId();
                    newUser.username = data.username;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        req.response.setSuccess();
                        return done(null, user);
                    });
                });
            }
        )
    );
};
