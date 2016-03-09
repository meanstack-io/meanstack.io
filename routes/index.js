'use strict';

var index = require('./routers/index'),
    view = require('./routers/view'),
    account = require('./routers/account'),
    account_signin = require('./routers/account/signin'),
    account_forgot = require('./routers/account/forgot');

/**
 * Initialize routes
 * @param app
 */
module.exports = function (app) {

    /**
     * Load views AngularJS
     */
    app.use('/view', view);

    /**
     * Route sign up and logoff
     */
    app.use('/account', account);

    /**
     * Route for sign in
     */
    app.use('/account/signin', account_signin);

    /**
     * Route for forgot password
     */
    app.use('/account/forgot', account_forgot);

    /**
     * If no route is valid is sent to index.
     */
    app.all('*', index);

};