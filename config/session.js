/*
 |--------------------------------------------------------------------------
 | Session
 |--------------------------------------------------------------------------
 | Create a session middleware.
 |
 | Documentation: https://github.com/expressjs/session
 |
 */

module.exports = {

    /*
     |--------------------------------------------------------------------------
     | Name
     |--------------------------------------------------------------------------
     | The name of the session ID cookie to set in the response (and read from in the request).
     | The default value is 'connect.sid'.
     | Note if you have multiple apps running on the same hostname (this is just the name, i.e. localhost or 127.0.0.1;
     | different schemes and ports do not name a different hostname), then you need to separate the session cookies from
     | each other. The simplest method is to simply set different names per app.
     |
     */
    name: 'meanstack.connect.si',

    /*
     |--------------------------------------------------------------------------
     | Proxy
     |--------------------------------------------------------------------------
     | Trust the reverse proxy when setting secure cookies (via the "X-Forwarded-Proto" header).
     | The default value is undefined.
     | true The "X-Forwarded-Proto" header will be used.
     | false All headers are ignored and the connection is considered secure only if there is a direct TLS/SSL connection.
     | undefined Uses the "trust proxy" setting from express
     */
    // proxy:

    /*
     |--------------------------------------------------------------------------
     | Resave
     |--------------------------------------------------------------------------
     | Forces the session to be saved back to the session store, even if the session was never modified during the
     | request. Depending on your store this may be necessary, but it can also create race conditions where a client
     | makes two parallel requests to your server and changes made to the session in one request may get overwritten
     | when the other request ends, even if it made no changes (this behavior also depends on what store you're using).
     | The default value is true, but using the default has been deprecated, as the default will change in the future.
     | Please research into this setting and choose what is appropriate to your use-case. Typically, you'll want false.
     */
    resave: false,

    /*
     |--------------------------------------------------------------------------
     | Rolling
     |--------------------------------------------------------------------------
     | Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge,
     | resetting the expiration countdown.
     | The default value is false.
     | Note When this option is set to true but the saveUninitialized option is set to false, the cookie will not be
     | set on a response with an uninitialized session.
     */
    // rolling:

    /*
     |--------------------------------------------------------------------------
     | Save Uninitialized
     |--------------------------------------------------------------------------
     | Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but
     | not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or
     | complying with laws that require permission before setting a cookie. Choosing false will also help with race
     | conditions where a client makes multiple parallel requests without a session.
     | The default value is true, but using the default has been deprecated, as the default will change in the future.
     | Please research into this setting and choose what is appropriate to your use-case.
     */
    saveUninitialized: false,

    /*
     |--------------------------------------------------------------------------
     | Secret -> Required option
     |--------------------------------------------------------------------------
     | This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an
     | array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the
     | session ID cookie, while all the elements will be considered when verifying the signature in requests.
     */
    secret: 'MySecretSession',

    /*
     |--------------------------------------------------------------------------
     | Unset
     |--------------------------------------------------------------------------
     | Control the result of unsetting req.session (through delete, setting to null, etc.).
     |
     | The default value is 'keep'.
     | - 'destroy' The session will be destroyed (deleted) when the response ends.
     | - 'keep' The session in the store will be kept, but modifications made during the request are ignored and not saved.
     */
    // unset:

    /*
     |--------------------------------------------------------------------------
     | Store
     |--------------------------------------------------------------------------
     | The session store instance, defaults to a new MemoryStore instance, MemoryStore is not designed for a production
     | environment, as it will leak memory, and will not scale past a single process.
     |
     | For production uses Redis.
     |   Redis: http://redis.io/
     |   Install Redis in Ubuntu 16: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04
     |
     | Store with Redis
     |   Documentation: https://github.com/tj/connect-redis
     |
     | Example:
     |  driverSessionStore: 'connect-redis',
     |
     |  store: {
     |      host: 'localhost',
     |      port: 8543,
     |      ...
     |  }
     */
    // driverStore: 'connect-redis',

    // store: {}

    /*
     |--------------------------------------------------------------------------
     | Cookie
     |--------------------------------------------------------------------------
     | Settings object for the session ID cookie. The default value is { path: '/', httpOnly: true, secure: false,
     | maxAge: null }.
     */
    // cookie: {
        /*
         |--------------------------------------------------------------------------
         | Domain
         |--------------------------------------------------------------------------
         | Specifies the value for the Domain Set-Cookie attribute. By default, no domain is set, and most clients will
         | consider the cookie to apply to only the current domain.
         */
        // domain:

        /*
         |--------------------------------------------------------------------------
         | Expires
         |--------------------------------------------------------------------------
         | Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is
         | set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like
         | exiting a web browser application.
         | Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.
         | Note The expires option should not be set directly; instead only use the maxAge option.
         */
        // expires:

        /*
         |--------------------------------------------------------------------------
         | httpOnly
         |--------------------------------------------------------------------------
         | Specifies the boolean value for the HttpOnly Set-Cookie attribute. When truthy, the HttpOnly attribute is
         | set, otherwise it is not. By default, the HttpOnly attribute is set.
         | Note be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see
         | the cookie in document.cookie.
         */
        // httpOnly:

        /*
         |--------------------------------------------------------------------------
         | Max Age
         |--------------------------------------------------------------------------
         | Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute. This is done
         | by taking the current server time and adding maxAge milliseconds to the value to calculate an Expires
         | datetime. By default, no maximum age is set.
         | Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.
         */
        // maxAge:

        /*
         |--------------------------------------------------------------------------
         | Path
         |--------------------------------------------------------------------------
         | Specifies the value for the Path Set-Cookie. By default, this is set to '/', which is the root path of
         | the domain.
         */
        // path:

        /*
         |--------------------------------------------------------------------------
         | Same Site
         |--------------------------------------------------------------------------
         | Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.
         |
         | * true will set the SameSite attribute to Strict for strict same site enforcement.
         | * false will not set the SameSite attribute.
         | * 'lax' will set the SameSite attribute to Lax for lax same site enforcement.
         | * 'strict' will set the SameSite attribute to Strict for strict same site enforcement.
         | * More information about the different enforcement levels can be found in the specification
         |   https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-4.1.1
         |
         | Note This is an attribute that has not yet been fully standardized, and may change in the future. This also
         | means many clients may ignore this attribute until they understand it.
         */
        // sameSite:

        /*
         |--------------------------------------------------------------------------
         | Secure
         |--------------------------------------------------------------------------
         | Specifies the boolean value for the Secure Set-Cookie attribute. When truthy, the Secure attribute is set,
         | otherwise it is not. By default, the Secure attribute is not set.
         | Note be careful when setting this to true, as compliant clients will not send the cookie back to the server
         | in the future if the browser does not have an HTTPS connection.
         | Please note that secure: true is a recommended option.
         */
        // secure:
    // }
};
