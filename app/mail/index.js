'use strict';

var nodemailer = require('nodemailer'),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),

    /**
     * Create transport SMTP.
     *
     * @param mail
     */
    smtp = function (mail, callback) {
        var nodemailerSmtp = nodemailer.createTransport({
            host: mail.smtp.host,
            secure: mail.smtp.secure,
            port: mail.smtp.port,
            auth: {
                user: mail.smtp.auth.user,
                pass: mail.smtp.auth.pass
            },
            logger: mail.smtp.logger,
            debug: mail.smtp.debug
        });

        if (typeof callback === 'undefined') {
            return nodemailerSmtp;
        } else {
            return callback(nodemailerSmtp);
        }
    },

    /**
     * Load template.
     *
     * @param templatePath
     * @param params
     * @param callback
     */
    template = function (templatePath, params, callback) {
        var template = new EmailTemplate(path.join(__dirname, 'templates', templatePath)),
            templateParams = (typeof params === 'undefined') ? {} : params;

        template.render(templateParams, function (err, result) {
            return callback(err, result);
        });
    },

    /**
     * Send e-mail with template.
     *
     * @param mailerSmtp
     * @param templatePath
     * @param templateParams
     * @param mailParams
     * @param callback
     */
    sendMail = function (mailerSmtp, templatePath, templateParams, mailParams, callback) {
        template(templatePath, templateParams, function (err, template) {
            if (err) {
                return callback(false);
            }

            mailParams.html = template.html;
            mailParams.subject = template.subject;

            mailerSmtp.sendMail(mailParams, function (err) {
                if (err) {
                    return callback(false);
                }

                return callback(true);
            });
        });
    };

// Export modules.
module.exports.smtp = smtp;
module.exports.template = template;
module.exports.sendMail = sendMail;
