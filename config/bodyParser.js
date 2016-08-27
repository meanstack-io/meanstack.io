/*
 |--------------------------------------------------------------------------
 | Body Parser
 |--------------------------------------------------------------------------
 | Node.js body parsing middleware.
 | Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property.
 | Documentation: https://www.npmjs.com/package/body-parser
 |
 */

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Json
     |--------------------------------------------------------------------------
     | Returns middleware that only parses json. This parser accepts any Unicode encoding of the body and supports
     | automatic inflation of gzip and deflate encodings.
     */
    // json: {},

    /*
     |--------------------------------------------------------------------------
     | Raw
     |--------------------------------------------------------------------------
     | Returns middleware that parses all bodies as a Buffer. This parser supports automatic inflation of gzip and
     | deflate encodings.
     */
    // raw: {},

    /*
     |--------------------------------------------------------------------------
     | Text
     |--------------------------------------------------------------------------
     | Returns middleware that parses all bodies as a string. This parser supports automatic inflation of gzip and
     | deflate encodings.
     */
    // text: {},

    /*
     |--------------------------------------------------------------------------
     | Url Encoded
     |--------------------------------------------------------------------------
     | Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body and
     | supports automatic inflation of gzip and deflate encodings.
     */
    urlencoded: {
        extended: true
    }
};
