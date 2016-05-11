'use strict';

var User = require('app/models/user').User;

/**
 * Find or Create user for strategies OAuth.
 *
 * @param req
 * @param token
 * @param refreshToken
 * @param profile
 * @param done
 */
module.exports = function (req, token, refreshToken, profile, done) {

    User.findOne({'oauth.provider': profile.provider, 'oauth.id': profile.id}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            req.response.setSuccess();
            return done(null, user);
        }

        var email = profile.emails[0].value;
        User.findOne({email: new RegExp('^' + email + '$', "i")}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                req.response.setMsg('E-mail "' + user.email + '" already registered.');
                return done(null, false);
            }

            var newUser = new User();
            newUser._id = newUser.newObjectId();
            newUser.oauth.provider = profile.provider;
            newUser.oauth.id = profile.id;
            newUser.oauth.token = token;
            newUser.username = profile.displayName;
            newUser.email = email;

            newUser.save(function (err, user) {
                if (err) {
                    return done(err);
                }
                req.response.setSuccess();
                return done(null, user);
            });
        });
    });
};
