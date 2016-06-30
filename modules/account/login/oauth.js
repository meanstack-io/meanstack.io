'use strict';

/**
 * Login OAuth.
 *
 * @param req
 * @param res
 * @param next
 * @param err
 * @param user
 * @returns {*}
 */
module.exports = function (req, res, next, err, user) {
    if (err) {
        return next(err);
    }
    if (!user || !req.response.getSuccess()) {
        var error = req.response.getMsg();
        return res.redirect('/signin?error=' + error.join());
    }
    req.logIn(user, function (err) {
        if (err) {
            return next(err);
        }
        req.setCookie(true,
            function () {
                res.redirect('/myaccount');
            }
        );
    });
};
