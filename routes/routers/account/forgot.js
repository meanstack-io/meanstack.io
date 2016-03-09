'use strict';

var express = require('express'),
    router = express.Router(),
    modelUser = require('../../../models/users').Users,
    settings = require('../../../config'),
    mailerSmtp = require('../../../modules/mail').smtp,
    crypto = require('crypto'),

    /**
     * Forgot password
     * Find user by email
     * Return - Application logged.
     * If local logged return token for reset password.
     * @param req
     * @param res
     * @param next
     */
    forgotPassword = function (req, res, next) {
        var data = req.body,
            validaEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!validaEmail.test(data.email)) {
            req.response.setMsg('Please enter a valid email address !');
        }
        if (req.response.hasMsg()) {
            return next();
        }
        modelUser.findOne({email: new RegExp('^' + data.email + '$', "i")}, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.response.setMsg('E-mail "' + data.email + '" not registered.');
                return next();
            }
            if (typeof user.oauth.provider !== 'undefined') {
                req.response.setPrivateData({type: user.oauth.provider});
                req.response.setSuccess();
                return next();
            }

            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                req.response.setPrivateData({type: 'local', token: token});
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.resetPasswordIp = req.header('x-forwarded-for') || req.connection.remoteAddress; //Get ip address client
                user.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    req.response.setSuccess();
                    return next();
                });
            });
        });
    },

    /**
     * Resset Password
     * Local Strategy.
     * Validation -  Token and IP client what solicited reset password.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    resetPassword = function (req, res, next) {
        var data = req.body,
            ipClient = req.header('x-forwarded-for') || req.connection.remoteAddress;

        if (!data.token || (data.token).length < 20) {
            req.response.setMsg('Token invalid !');
        }
        if (!data.password || (data.password).length < 6) {
            req.response.setMsg('Your password must have more than 6 characters !');
        }
        if (data.password != data.repassword) {
            req.response.setMsg('Make sure your passwords are the same !');
        }
        if (req.response.hasMsg()) {
            return next();
        }

        modelUser.findOne({
            resetPasswordToken: data.token,
            resetPasswordExpires: {$gt: Date.now()},
            resetPasswordIp: ipClient
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.response.setMsg('Password reset token is invalid or has expired.');
                return next();
            }

            user.password = user.generateHash(data.password);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            user.resetPasswordIp = null;
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                req.response.setPrivateData({user: user});
                req.response.setSuccess();
                return next();
            });
        });
    },

    /**
     * Equivalent of PHP’s ucfirst
     * @param str
     * @returns {string}
     */
    ucfirst = function (str) {
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    };


/**
 * Forgot password
 * If user logged with application OAuth send email with application logged
 * If logged with application local send email with token for reset password.
 */
router.post('/', forgotPassword, function (req, res, next) {
    if (!req.response.getSuccess()) {
        return res.json(req.response.return());
    }

    var data = req.response.getPrivateData(),
        email = req.body.email,
        mailOptions = {
            from: '"'+settings.name+'" <'+settings.mail.smtp.auth.user+'>',
            to: email,
            subject: settings.name + ' Password Reset !'
        };

    if (data.type === 'local') {
        var url = settings.server.url + "forgot/" + data.token;
        mailOptions.html = 'Reset password access <a href="'+url+'"> click here! </a> <br>Or copy and paste this link into your browser. ' + url;
    } else {
        mailOptions.html = "You logged with application " + ucfirst(data.type);
    }

    mailerSmtp.sendMail(mailOptions, function (err) {
        if (err) {
            return next(err);
        }
        req.response.setMsg('Message has been sent to the e-mail ' + email);
        return res.json(req.response.return());
    });
});

/**
 * Reset Password
 */
router.post('/reset', resetPassword, function (req, res, next) {
    if (!req.response.getSuccess()) {
        return res.json(req.response.return());
    }
    var data = req.response.getPrivateData();
    req.logIn(data.user, function (err) {
        if (err) {
            return next(err);
        }
        req.setCookie(true,
            function () {
                return res.json(req.response.return());
            }
        );
    });
});

module.exports = router;
