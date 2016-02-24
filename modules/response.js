'use strict';

/**
 * Export module Response for "req.response"
 * @returns {Function}
 */
module.exports = function () {
    return function(req, res, next) {
        if (req.response) { return next(); }
        req.response = new response();
        next();
    }
};

/**
 * Default return response
 * @private
 */
function response() {
    var val = {
        success: false,
        msg: []
    };

    this.setSuccess = function (boolean) {
        val.success = (typeof boolean === 'undefined')? true : boolean;
        return true;
    };
    this.getSuccess = function () {
        return val.success;
    };

    this.setMsg = function (msg) {
        val.msg.push(msg);
        return true;
    };
    this.getMsg = function () {
        return val.msg;
    };
    this.hasMsg = function () {
        return ((val.msg).length);
    };

    this.return = function(){
        return val;
    }
}