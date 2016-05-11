'use strict';

var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    settings = require('config');

/**
 * Custom route index My Account.
 * Sending object to the front end.
 */
router.get('/index', function (req, res) {
    res.render('myaccount/index',
        {
            'welcome': 'Welcome <i class="fa fa-exclamation" aria-hidden="true"></i> <small> Thank you for using ' + settings.name + ' </small>',
            'date': moment().format('LLLL')
        }
    );
});

module.exports = router;
