'use strict';

/**
 * Initialize routes
 *
 * @param app
 */
module.exports = function (app) {

    /**
     * Route account
     */
    app.use('/account/signin', require('./controllers/account/signin'));
    app.use('/account/signup', require('./controllers/account/signup'));
    app.use('/account/forgot', require('./controllers/account/forgot'));
    app.use('/account/logoff', require('./controllers/account/logoff'));

    /**
     * Custom routes view
     */
    app.use('/view/myaccount', require('./controllers/views/myaccount'));

    /**
     * Auto Load views
     */
    app.use('/view', require('./controllers/views/auto-load'));

    /**
     * Index.
     */
    app.all('*', require('./controllers/home'));

};
