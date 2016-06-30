'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('app/models/user').User,
    settings = require('config'),
    mailer = require('app/mail'),
    mailerSmtp = mailer.smtp(settings.mail),
    mailerSendMail = mailer.sendMail,
    crypto = require('crypto'),
    login = require('modules/account/login');


/**
 * Forgot password.
 * If user logged with application OAuth send email with application logged.
 * If logged with application local send email with token for reset password.
 */
router.post('/', function (req, res, next) {

    var data = req.body,
        validaEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!validaEmail.test(data.email)) {
        req.response.setMsg('Please enter a valid email address !');
        return res.json(req.response.return());
    }

    User.findOne({email: new RegExp('^' + data.email + '$', "i")}, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.response.setMsg('E-mail "' + data.email + '" not registered.');
            return res.json(req.response.return());
        }

        var paramsTemplate = {
                user: user,
                settings: settings
            },
            paramsSendMail = {
                from: '"' + settings.name + '" <' + settings.mail.smtp.auth.user + '>',
                to: data.email
            },
            errorSendMail = 'Error sending email, try again, if still does not work please contact support !',
            successSendMail = 'Message has been sent to the e-mail ' + user.email;

        if (typeof user.oauth.provider !== 'undefined') {
            mailerSendMail(
                mailerSmtp,
                'forgot-account/logged-with-application',
                paramsTemplate,
                paramsSendMail,
                function (success) {
                    if (!success) {
                        req.response.setMsg(errorSendMail);
                        return res.json(req.response.return());
                    }

                    req.response.setSuccess();
                    req.response.setMsg(successSendMail);
                    return res.json(req.response.return());
                }
            );

        } else {
            crypto.randomBytes(20, function (err, buf) {
                user.resetPassword.token = buf.toString('hex');
                // 1 hour expires token
                user.resetPassword.expires = Date.now() + 3600000;
                // Get IP address client.
                user.resetPassword.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
                user.save(function (err) {
                    if (err) {
                        return next(err);
                    }

                    paramsTemplate.user = user;

                    mailerSendMail(
                        mailerSmtp,
                        'forgot-account/link-reset-password',
                        paramsTemplate,
                        paramsSendMail,
                        function (success) {
                            if (!success) {
                                req.response.setMsg(errorSendMail);
                                return res.json(req.response.return());
                            }

                            req.response.setSuccess();
                            req.response.setMsg(successSendMail);
                            return res.json(req.response.return());
                        }
                    );
                });
            });
        }
    });
});

/**
 * Reset Password.
 */
router.post('/reset', function (req, res, next) {

    var data = req.body,
        remoteAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

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
        return res.json(req.response.return());
    }

    User.findOne(
        {
            'resetPassword.token': data.token,
            'resetPassword.expires': {$gt: Date.now()},
            'resetPassword.ip': remoteAddress
        },
        function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.response.setMsg('Token is invalid or has expired.');
                return res.json(req.response.return());
            }

            user.password = user.generateHash(data.password);
            user.resetPassword.token = null;
            user.resetPassword.expires = null;
            user.resetPassword.ip = null;
            user.save(function (err) {
                req.response.setSuccess();
                login(req, res, next, err, user);
            });
        }
    );
});

module.exports = router;
