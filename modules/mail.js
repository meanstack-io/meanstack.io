'use strict';

var nodemailer = require('nodemailer'),
    settings = require('../config');

module.exports.smtp = nodemailer.createTransport({
    host: settings.mail.smtp.host,
    secure: settings.mail.smtp.secure,
    port: settings.mail.smtp.port,
    auth: {
        user: settings.mail.smtp.auth.user,
        pass: settings.mail.smtp.auth.pass
    },
    logger: settings.mail.smtp.logger,
    debug: settings.mail.smtp.debug
});
