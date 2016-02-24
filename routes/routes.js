var index = require('./index');
var view = require('./view');
var account = require('./account');

/**
 * Initialize routes
 * @param app
 */
exports.initialize = function (app) {

    /**
     * Load views AngularJS
     */
    app.use('/view', view);

    /**
     * Route for POST signin, signup and logoff
     */
    app.use('/account', account);

    /**
     * If no route is valid is sent to index.
     */
    app.all('*', index);

};