'use strict';

/**
 * Login
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
        return res.json(req.response.return());
    }
    req.logIn(user, function (err) {
        if (err) {
            return next(err);
        }
        req.setCookie(true,
            function () {
                return res.json(req.response.return());
            }
        );
    });
};
