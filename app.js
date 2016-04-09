'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    store = new session.MemoryStore(),
    passport = require('passport'),
    response = require('./modules/response'),
    passportStrategies = require('./passport'),
    policies = require('./routes/policies'),
    routes = require('./routes'),
    settings = require('./config'),
    hbs = require('express-handlebars').create(
        {
            extname: ".hbs",
            partialsDir: path.join(__dirname, 'views/partials/')
        }
    );

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(
        {
            secret: settings.session.secret,
            resave: false,
            saveUninitialized: false,
            store: store,
            cookie: {
                httpOnly: true, maxAge: 2419200000
            }
        }
    )
);

/**
 * Module Response
 */
app.use(response());

/**
 * Init Passaport
 */
app.use(passport.initialize());
app.use(passport.session());
passportStrategies(passport);

/**
 * Module Auth
 */
policies(app);

/**
 * Initialize Routes
 */
routes(app);

/**
 * error handler
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var msgError = '<h1>' + err.message + '</h1>';
    msgError += (app.get('env') === 'development') ? '<p>' + (err.status || 500) + '</p><p>' + err.stack + '</p>' : '';
    res.send(msgError);
});

module.exports = app;
