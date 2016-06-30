/**
 * Config Application
 *
 * @type {{name: string, description: string, version: string, server: {hostname: string, port: string, url: string}, dbconnect: {host: string, port: string, user: string, password: string, base: string}, session: {secret: string}, cookie: {flagAngularLogged: string, maxAge: number}, mail: {smtp: {host: string, secure: boolean, port: string, auth: {user: string, pass: string}, logger: boolean, debug: boolean}}}}
 */
var settings = {
    name: 'MEANStack.io',
    description: 'bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js',
    version: "0.2.0-dev",
    server: {
        hostname: 'localhost',
        port: '8000',
        url: 'http://localhost:8000/'
    },
    dbconnect: {
        host: 'localhost',
        port: '27017',
        user: '##########',
        password: '##########',
        base: '##########'
    },
    session: {
        secret: '##########'
    },
    cookie: {
        flagAngularLogged: 'login',
        maxAge: 2419200000
    },
    mail: {
        smtp: {
            host: 'smtp.gmail.com',
            secure: true,
            port: '465',
            auth: {
                user: '##########@gmail.com',
                pass: '##########'
            },
            logger: true,
            debug: true
        }
    }
};

/**
 * Config auth Facebook
 * URL for create application: "https://developers.facebook.com/quickstarts"
 *
 * @type {{clientID: string, clientSecret: string, callbackURL: string}}
 */
settings.facebookStrategy = {
    clientID: '####################',
    clientSecret: '####################',
    callbackURL: settings.server.url + 'account/signin/facebook/callback'
};

/**
 * Config auth Google
 * URL for create application: "https://console.developers.google.com/projectselector/apis/library"
 * More documentation: "https://developers.google.com/+/web/signin/", "https://developers.google.com/identity/sign-in/web/devconsole-project"
 *
 * @type {{clientID: string, clientSecret: string, callbackURL: string}}
 */
settings.googleStrategy = {
    clientID: '####################.apps.googleusercontent.com',
    clientSecret: '####################',
    callbackURL: settings.server.url + 'account/signin/google/callback'
};

/**
 * Config auth Linkedin
 * URL for create application and more documentation "https://developer.linkedin.com/docs/oauth2"
 * After creating the application set in "Default Application Permissions" r_basicprofile r_emailaddress
 * for return profile datas
 *
 * @type {{clientID: string, clientSecret: string, callbackURL: string}}
 */
settings.linkedinStrategy = {
    clientID: '####################',
    clientSecret: '####################',
    callbackURL: settings.server.url + 'account/signin/linkedin/callback'
};

/**
 * Config auth Twitter
 *
 * You must set up Twitter so that it returns the email, our application email is a primary key.
 * To do this you need to create an application in "https://apps.twitter.com" go after
 * "https://support.twitter.com/forms/platform" and request a special permit, fill in the name of your application,
 * id application and they requested permission field put "Access to e-mail address at login oauth."
 *
 * if this recurring error in "profile.emails [0] .value" check the Twitter configuration because it is
 * not returning the email.
 *
 * @type {{consumerKey: string, consumerSecret: string, callbackURL: string}}
 */
settings.twitterStrategy = {
    consumerKey: '####################',
    consumerSecret: '####################',
    callbackURL: settings.server.url + 'account/signin/twitter/callback'
};

/**
 * Config auth GitHub
 * Create application: Go on GitHub("https://github.com/"), create or access your organization, go to settings, click on the "OAuth applications" and register your new application.
 * More documentation: "https://developer.github.com/v3/oauth/"
 *
 * @type {{clientID: string, clientSecret: string, callbackURL: string}}
 */
settings.githubStrategy = {
    clientID: '####################',
    clientSecret: '####################',
    callbackURL: settings.server.url + 'account/signin/github/callback'
};

module.exports = settings;
