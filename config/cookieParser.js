/*
 |--------------------------------------------------------------------------
 | Cookie Parser
 |--------------------------------------------------------------------------
 | Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable
 | signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 |
 */

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Secret
     |--------------------------------------------------------------------------
     | Secret a string or array used for signing cookies. This is optional and if not specified, will not parse signed
     | cookies. If a string is provided, this is used as the secret. If an array is provided, an attempt will be made
     | to unsign the cookie with each secret in order.
     */
    // secret:

    /*
     |--------------------------------------------------------------------------
     | Options
     |--------------------------------------------------------------------------
     | Options an object that is passed to cookie.parse as the second option.
     | Documentation: https://www.npmjs.com/package/cookie
     */
    // options: {},
    
};
