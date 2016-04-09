/**
 * Config Application
 */
var settings = {
    name: 'MEANStack',
    version: "0.1.0",
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
        flagAngularLogged: 'login'
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
 */
settings.facebookStrategy = {
    clientID: '####################', // your App ID
    clientSecret: '####################', // your App Secret
    callbackURL: settings.server.url + 'account/signin/facebook/callback' //callback return facebook
};

/**
 * Config auth Google
 * URL for create application: "https://console.developers.google.com/projectselector/apis/library"
 * More documentation: "https://developers.google.com/+/web/signin/", "https://developers.google.com/identity/sign-in/web/devconsole-project"
 */
settings.googleStrategy = {
    clientID: '####################.apps.googleusercontent.com', // your App ID
    clientSecret: '####################', // your App Secret
    callbackURL: settings.server.url + 'account/signin/google/callback' //callback return google
};

/**
 * Config auth Linkedin
 * URL for create application and more documentation "https://developer.linkedin.com/docs/oauth2"
 * After creating the application set in "Default Application Permissions" r_basicprofile r_emailaddress
 * for return profile datas
 */
settings.linkedinStrategy = {
    clientID: '####################', // your App ID
    clientSecret: '####################', // your App Secret
    callbackURL: settings.server.url + 'account/signin/linkedin/callback' //callback return linkedin
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
    consumerKey: '####################', // your App ID
    consumerSecret: '####################', // your App Secret
    callbackURL: settings.server.url + 'account/signin/twitter/callback' //callback return twitter
};

/**
 * Config auth GitHub
 * Create application: Go on GitHub("https://github.com/"), create or access your organization, go to settings, click on the "OAuth applications" and register your new application.
 * More documentation: "https://developer.github.com/v3/oauth/"
 * @type {{clientID: string, clientSecret: string, callbackURL: string}}
 */
settings.githubStrategy = {
    clientID: '####################', // your App ID
    clientSecret: '####################', // your App Secret
    callbackURL: settings.server.url + 'account/signin/github/callback' //callback return linkedin
};

module.exports = settings;
